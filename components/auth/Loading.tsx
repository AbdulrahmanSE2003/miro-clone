import Image from "next/image";
import { Spinner } from "../ui/spinner";

const Loading = () => {
  return (
    <div
      className={`h-screen w-full flex flex-col justify-center items-center gap-4`}
    >
      <Spinner className={`size-10`} />
      <span className="font-semibold tracking-widest text-xl">Miro</span>
    </div>
  );
};

export default Loading;
