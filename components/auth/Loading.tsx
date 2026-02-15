import Image from "next/image";
import { Spinner } from "../ui/spinner";

const Loading = () => {
  return (
    <div className={`h-full w-full flex flex-col justify-center items-center`}>
      <Spinner className={`size-10`} />
    </div>
  );
};

export default Loading;
