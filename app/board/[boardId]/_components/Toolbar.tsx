const Toolbar = () => {
  return (
    <div
      className={`absolute top-1/2 left-2 -translate-y-1/2 flex flex-col gap-y-4`}
    >
      <div
        className={`bg-white rounded-md p-1.5 gap-y-1 flex-col items-center shadow-md`}
      >
        <div>Pencil</div>
        <div>square</div>
        <div>circle</div>
        <div>sticky</div>
      </div>
      <div
        className={`bg-white rounded-md p-1.5 gap-y-1 flex-col items-center shadow-md`}
      >
        <div>Undo</div>
        <div>Redo</div>
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
