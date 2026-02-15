import List from "./List";
import NewButton from "./new-button";

const Sidebar = () => {
  return (
    <aside
      className={`fixed left-0 z-1 flex p-3 flex-col gap-y-4 bg-blue-950 h-full w-15  justify-start items-center text-white`}
    >
      <NewButton />
      <List />
    </aside>
  );
};

export default Sidebar;
