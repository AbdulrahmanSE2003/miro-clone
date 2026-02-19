import { Loader } from "lucide-react";
import { InfoSkeleton } from "./Info";
import { ParticipantsSkeleton } from "./Participants";
import { ToolbarSkeleton } from "./Toolbar";

const Loading = () => {
  return (
    <main
      className={` min-h-screen h-full w-full flex items-center justify-center relative touch-none bg-neutral-200`}
    >
      <Loader className={`h-6 w-6 text-muted-foreground animate-spin`} />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};

export default Loading;
