"use client";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
  useSelf,
} from "@liveblocks/react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  Layer,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import CursorsPresence from "./CursorsPresence";
import {
  colorToCSS,
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventsToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./LayerPreview";
import SelectionBox from "./SelectionBox";
import ColorPicker from "./ColorPicker";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils";

type CanvasProps = {
  boardId: string;
};

const MAX_LAYERS = 100;

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 134,
    b: 49,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  // ─── Insert a new layer ──────────────────────────────────────────────────────
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Text
        | LayerType.Rectangle,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );

  // ─── Translate (move) selected layers ────────────────────────────────────────
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");
      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  // ─── Resize selected layer ────────────────────────────────────────────────────
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const [id] = self.presence.selection;
      if (id) {
        liveLayers.get(id)?.update(bounds);
      }
    },
    [canvasState],
  );

  // ─── Update selection net ────────────────────────────────────────────────────
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

      const ids = findIntersectingLayersWithRectangle(
        layerIds ?? [],
        layers as ReadonlyMap<string, Layer>,
        origin,
        current,
      );
      setMyPresence({ selection: ids });
    },
    [layerIds],
  );

  // ─── Start multi-selection with a net ────────────────────────────────────────
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    // Only start a net if the pointer has moved enough (avoid accidental nets)
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);

  // ─── Unselect all layers ─────────────────────────────────────────────────────
  const unselectLayers = useMutation(({ setMyPresence }) => {
    setMyPresence({ selection: [] }, { addToHistory: true });
  }, []);

  // ─── Pencil drawing ──────────────────────────────────────────────────────────
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        !pencilDraft
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : ([...pencilDraft, [point.x, point.y, e.pressure]] as [number, number, number][]),
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (!pencilDraft || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft as number[][], lastUsedColor)),
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor],
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );

  // ─── Change fill color of selected layers ─────────────────────────────────────
  const setFill = useMutation(
    ({ storage, self }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      for (const id of self.presence.selection) {
        liveLayers.get(id)?.set("fill", fill);
      }
    },
    [setLastUsedColor],
  );

  // ─── Delete selected layers ───────────────────────────────────────────────────
  const deleteLayers = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      for (const id of self.presence.selection) {
        liveLayers.delete(id);
        const idx = liveLayerIds.indexOf(id);
        if (idx !== -1) {
          liveLayerIds.delete(idx);
        }
      }
      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [],
  );

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace":
          deleteLayers();
          break;
        case "z":
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
          }
          break;
        case "Escape":
          setCanvasState({ mode: CanvasMode.None });
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [deleteLayers, history]);

  // ─── Camera pan ──────────────────────────────────────────────────────────────
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  // ─── Pointer move ────────────────────────────────────────────────────────────
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventsToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      camera,
      canvasState,
      startMultiSelection,
      updateSelectionNet,
      translateSelectedLayers,
      resizeSelectedLayer,
      continueDrawing,
    ],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  // ─── Pointer down on empty canvas ────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventsToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) return;

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ mode: CanvasMode.Pressing, origin: point });
    },
    [canvasState.mode, camera, startDrawing],
  );

  // ─── Pointer up ──────────────────────────────────────────────────────────────
  const onPointerUp = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      const point = pointerEventsToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, insertPath, unselectLayers],
  );

  // ─── Pointer down on a layer ──────────────────────────────────────────────────
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventsToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode],
  );

  // ─── Pointer down on a resize handle ─────────────────────────────────────────
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner });
    },
    [history],
  );

  // ─── Selection color per other user ──────────────────────────────────────────
  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const [connectionId, selection] of selections) {
      if (selection) {
        for (const layerId of selection) {
          layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
        }
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  // ─── Current user's own selection (for checking if color picker shows) ────────
  const hasSelection = useSelf((me) => me.presence.selection.length > 0);

  // ─── Pencil draft displayed for current user ──────────────────────────────────
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const penColor = useSelf((me) => me.presence.penColor);

  const currentPathData = useMemo(() => {
    if (!pencilDraft || pencilDraft.length < 2) return null;
    const stroke = getStroke(pencilDraft as number[][], {
      size: 16,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
    });
    return getSvgPathFromStroke(stroke);
  }, [pencilDraft]);

  return (
    <main
      style={{
        backgroundImage: `radial-gradient(#cfcfcf 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
      className={`min-h-screen h-full w-full relative touch-none bg-neutral-200`}
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />

      {/* Color picker — visible when any layer is selected */}
      {hasSelection && (
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-white rounded-xl shadow-md px-4 py-3 gap-3`}
        >
          <ColorPicker onChange={setFill} />
        </div>
      )}

      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        className={`h-screen w-screen`}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}

          {/* Selection box with resize handles */}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

          {/* Selection net rectangle */}
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.current.x - canvasState.origin.x)}
                height={Math.abs(canvasState.current.y - canvasState.origin.y)}
                strokeWidth={1}
              />
            )}

          {/* Current user's live pencil draft */}
          {currentPathData && (
            <path
              fill={penColor ? colorToCSS(penColor) : "#000"}
              className="pointer-events-none"
              d={currentPathData}
            />
          )}

          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
