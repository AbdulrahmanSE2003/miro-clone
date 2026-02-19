import { Loader } from "lucide-react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

const Loading = () => {
  return (
    <main
      className={` min-h-screen h-full w-full flex items-center justify-center relative touch-none bg-neutral-200`}
    >
      <Loader className={`h-6 w-6 text-muted-foreground animate-spin`} />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default Loading;
