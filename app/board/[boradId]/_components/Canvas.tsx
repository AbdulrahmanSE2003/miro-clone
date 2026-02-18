"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main
      className={` min-h-screen h-full w-full relative touch-none bg-neutral-200`}
    >
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
