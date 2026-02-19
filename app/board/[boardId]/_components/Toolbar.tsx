import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import ToolButton from "./ToolButton";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

type ToolbarProps = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const Toolbar = ({
  canvasState,
  setCanvasState,
  canRedo,
  redo,
  canUndo,
  undo,
}: ToolbarProps) => {
  return (
    <div
      className={`absolute top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4`}
    >
      <div
        className={`bg-white rounded-md p-1.5 gap-y-1 flex flex-col items-center shadow-md`}
      >
        <ToolButton
          label="select"
          icon={MousePointer2}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.None,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="text"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isDisabled={false}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          isDisabled={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          isDisabled={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          isDisabled={false}
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
          isDisabled={false}
        />
      </div>
      <div
        className={`bg-white rounded-md p-1.5 gap-y-1 flex flex-col items-center shadow-md`}
      >
        <ToolButton
          label="undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export default Toolbar;

export const ToolbarSkeleton = () => {
  return (
    <div
      className={`absolute top-1/2 left-2 w-13 h-90 bg-white rounded-md -translate-y-1/2 flex flex-col gap-y-4 shadow-md`}
    ></div>
  );
};
