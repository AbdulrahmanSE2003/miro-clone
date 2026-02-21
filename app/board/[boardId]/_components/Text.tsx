"use client";

import { colorToCSS } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

type TextProps = {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer;
  const ref = useRef<HTMLElement>(null);

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ outline: selectionColor ? `3px solid ${selectionColor}` : "none" }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className="h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCSS(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};

export default Text;
