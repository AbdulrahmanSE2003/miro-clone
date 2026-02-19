"use client";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "@liveblocks/react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import CursorsPresence from "./CursorsPresence";
import { pointerEventsToCanvasPoint } from "@/lib/utils";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventsToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    [],
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main
      style={{
        backgroundImage: `radial-gradient(#cfcfcf 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
      className={` min-h-screen h-full w-full relative touch-none bg-neutral-200`}
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
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={`h-screen w-screen`}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
