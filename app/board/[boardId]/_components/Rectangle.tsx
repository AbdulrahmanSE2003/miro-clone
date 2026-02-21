import { colorToCSS } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

type RectangleProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Rectangle = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className={`drop-shadow-md`}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={3}
      fill={fill ? colorToCSS(fill) : "rgb(255, 134, 49)"}
      stroke={selectionColor || "transparent"}
    >
      Rectangle
    </rect>
  );
};

export default Rectangle;
