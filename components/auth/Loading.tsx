import Image from "next/image";

const Loading = () => {
  return (
    <div className={`h-full w-full flex flex-col justify-center items-center`}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={80}
        height={80}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
