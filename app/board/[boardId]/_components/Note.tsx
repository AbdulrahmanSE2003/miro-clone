"use client";

import { colorToCSS } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

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
      style={{
        outline: selectionColor ? `3px solid ${selectionColor}` : "none",
        borderRadius: "8px",
      }}
    >
      <div
        className="h-full w-full flex flex-col justify-between rounded-lg drop-shadow-md p-4"
        style={{
          backgroundColor: fill ? colorToCSS(fill) : "rgb(255, 230, 130)",
        }}
      >
        <ContentEditable
          html={value || "Note"}
          onChange={handleContentChange}
          className="h-full w-full flex items-center justify-center text-center outline-none font-semibold"
          style={{
            fontSize: calculateFontSize(width, height),
            color: "#1a1a1a",
          }}
        />
      </div>
    </foreignObject>
  );
};

export default Note;
