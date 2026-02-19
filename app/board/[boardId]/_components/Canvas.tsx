"use client";

import { useHistory, useCanRedo, useCanUndo } from "@liveblocks/react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

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
    </main>
  );
};

export default Canvas;
