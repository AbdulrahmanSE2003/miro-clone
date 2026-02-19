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

const Toolbar = () => {
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
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="text"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div
        className={`bg-white rounded-md p-1.5 gap-y-1 flex flex-col items-center shadow-md`}
      >
        <ToolButton
          label="undo"
          icon={Undo2}
          onClick={() => {}}
          isDisabled={true}
        />
        <ToolButton
          label="redo"
          icon={Redo2}
          onClick={() => {}}
          isDisabled={true}
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
