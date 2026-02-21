"use client";

import { useStorage, useSelf } from "@liveblocks/react";
import { memo } from "react";
import { Layer, Side, XYWH } from "@/types/canvas";

const HANDLE_SIZE = 8;

type SelectionBoxProps = {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

/**
 * Compute the bounding box encompassing all given layers.
 */
function getBoundingBox(layers: Layer[]): XYWH | null {
  if (layers.length === 0) return null;

  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const layer of layers) {
    left = Math.min(left, layer.x);
    top = Math.min(top, layer.y);
    right = Math.max(right, layer.x + layer.width);
    bottom = Math.max(bottom, layer.y + layer.height);
  }

  return { x: left, y: top, width: right - left, height: bottom - top };
}

const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null,
  );

  // Show resize handles only for single selection
  const isShowingHandles = !!soleLayerId;

  const selectedIds = useSelf((me) => me.presence.selection);

  const layerBounds = useStorage((root) => {
    const layers: Layer[] = [];
    for (const id of selectedIds ?? []) {
      const layer = root.layers.get(id);
      if (layer) layers.push(layer as Layer);
    }
    return getBoundingBox(layers);
  });

  if (!layerBounds) return null;

  return (
    <>
      {/* Selection bounding box outline */}
      <rect
        className="pointer-events-none fill-transparent"
        style={{ transform: `translate(${layerBounds.x}px, ${layerBounds.y}px)` }}
        x={0}
        y={0}
        width={layerBounds.width}
        height={layerBounds.height}
        stroke="#0b99ff"
        strokeWidth={1}
      />

      {/* Resize handles — only shown when a single layer is selected */}
      {isShowingHandles && (
        <>
          {/* Top-left */}
          <rect
            className="fill-white cursor-nwse-resize"
            x={layerBounds.x - HANDLE_SIZE / 2}
            y={layerBounds.y - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.top + Side.left, layerBounds);
            }}
          />
          {/* Top-center */}
          <rect
            className="fill-white cursor-ns-resize"
            x={layerBounds.x + layerBounds.width / 2 - HANDLE_SIZE / 2}
            y={layerBounds.y - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.top, layerBounds);
            }}
          />
          {/* Top-right */}
          <rect
            className="fill-white cursor-nesw-resize"
            x={layerBounds.x + layerBounds.width - HANDLE_SIZE / 2}
            y={layerBounds.y - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.top + Side.right, layerBounds);
            }}
          />
          {/* Right-center */}
          <rect
            className="fill-white cursor-ew-resize"
            x={layerBounds.x + layerBounds.width - HANDLE_SIZE / 2}
            y={layerBounds.y + layerBounds.height / 2 - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.right, layerBounds);
            }}
          />
          {/* Bottom-right */}
          <rect
            className="fill-white cursor-nwse-resize"
            x={layerBounds.x + layerBounds.width - HANDLE_SIZE / 2}
            y={layerBounds.y + layerBounds.height - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.bottom + Side.right, layerBounds);
            }}
          />
          {/* Bottom-center */}
          <rect
            className="fill-white cursor-ns-resize"
            x={layerBounds.x + layerBounds.width / 2 - HANDLE_SIZE / 2}
            y={layerBounds.y + layerBounds.height - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.bottom, layerBounds);
            }}
          />
          {/* Bottom-left */}
          <rect
            className="fill-white cursor-nesw-resize"
            x={layerBounds.x - HANDLE_SIZE / 2}
            y={layerBounds.y + layerBounds.height - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.bottom + Side.left, layerBounds);
            }}
          />
          {/* Left-center */}
          <rect
            className="fill-white cursor-ew-resize"
            x={layerBounds.x - HANDLE_SIZE / 2}
            y={layerBounds.y + layerBounds.height / 2 - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            stroke="#0b99ff"
            strokeWidth={1}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.left, layerBounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";
export default SelectionBox;
