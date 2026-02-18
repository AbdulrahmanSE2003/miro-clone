import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className={`h-full  flex-center flex-col `}>
      <Image src={"/draw.svg"} height={300} width={300} alt="Empty Search" />
      <h2 className={`text-2xl font-semibold mt-6`}>No results found</h2>
      <p className={`text-muted-foreground text-sm mt-2`}>
        Try Searching for something else.
      </p>
    </div>
  );
};

export default EmptySearch;
