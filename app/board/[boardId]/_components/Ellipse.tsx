import { colorToCSS } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

type EllipseProps = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const Ellipse = ({ id, layer, onPointerDown, selectionColor }: EllipseProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      onPointerDown={(e) => onPointerDown(e, id)}
      fill={fill ? colorToCSS(fill) : "rgb(255, 134, 49)"}
      stroke={selectionColor || "transparent"}
      strokeWidth={selectionColor ? 3 : 0}
    />
  );
};

export default Ellipse;
