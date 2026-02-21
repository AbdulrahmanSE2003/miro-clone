"use client";

import { colorToCSS, getSvgPathFromStroke } from "@/lib/utils";
import { PathLayer } from "@/types/canvas";
import getStroke from "perfect-freehand";

type PathProps = {
  id: string;
  layer: PathLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Path = ({ id, layer, onPointerDown, selectionColor }: PathProps) => {
  const { x, y, fill, points } = layer;

  if (!points || points.length === 0) return null;

  // points stored as flat [x, y, pressure] triples in the layer
  const pointsArray = (points as unknown as number[][]);

  const stroke = getStroke(pointsArray, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return (
    <path
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      d={getSvgPathFromStroke(stroke)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      fill={fill ? colorToCSS(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={selectionColor ? 1 : 0}
    />
  );
};

export default Path;
