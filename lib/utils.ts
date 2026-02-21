import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventsToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCSS(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

/**
 * Compute new bounds when resizing a layer by dragging a corner/edge handle.
 */
export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };

  if ((corner & Side.left) !== 0) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner & Side.right) !== 0) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }
  if ((corner & Side.top) !== 0) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }
  if ((corner & Side.bottom) !== 0) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

/**
 * Return the ids of layers that intersect the rectangle defined by origin and current.
 */
export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  origin: Point,
  current: Point,
): string[] {
  const rect = {
    x: Math.min(origin.x, current.x),
    y: Math.min(origin.y, current.y),
    width: Math.abs(current.x - origin.x),
    height: Math.abs(current.y - origin.y),
  };

  const ids: string[] = [];
  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (!layer) continue;
    const { x, y, width, height } = layer;
    if (
      x < rect.x + rect.width &&
      x + width > rect.x &&
      y < rect.y + rect.height &&
      y + height > rect.y
    ) {
      ids.push(layerId);
    }
  }
  return ids;
}

/**
 * Convert raw pen-point data to a PathLayer object.
 */
export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot create path layer with fewer than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    if (left > x) left = x;
    if (top > y) top = y;
    if (right < x) right = x;
    if (bottom < y) bottom = y;
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]) as unknown as number[],
  };
}

/**
 * Convert a perfect-freehand stroke to an SVG path `d` string.
 */
export function getSvgPathFromStroke(stroke: number[][]): string {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"] as (string | number)[],
  );

  d.push("Z");
  return d.join(" ");
}
