"use client";

import { Color } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

interface ColorSwatchProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorSwatch = ({ onClick, color }: ColorSwatchProps) => {
  return (
    <button
      className="w-8 h-8 rounded-md border border-neutral-300 hover:scale-110 transition"
      style={{ background: colorToCSS(color) }}
      onClick={() => onClick(color)}
    />
  );
};

const COLORS: Color[] = [
  { r: 243, g: 82, b: 35 },
  { r: 255, g: 249, b: 177 },
  { r: 68, g: 202, b: 99 },
  { r: 39, g: 142, b: 237 },
  { r: 155, g: 105, b: 245 },
  { r: 252, g: 142, b: 42 },
  { r: 255, g: 255, b: 255 },
  { r: 0, g: 0, b: 0 },
];

type ColorPickerProps = {
  onChange: (color: Color) => void;
};

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      {COLORS.map((color) => (
        <ColorSwatch
          key={colorToCSS(color)}
          color={color}
          onClick={onChange}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
