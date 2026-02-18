import Image from "next/image";

const EmptyFavorite = () => {
  return (
    <div className={`h-full  flex-center flex-col `}>
      <Image src={"/think.svg"} height={300} width={300} alt="Empty favorite" />
      <h2 className={`text-2xl font-semibold mt-6`}>No favorites boards.</h2>
      <p className={`text-muted-foreground text-sm mt-2`}>
        Try add more boards to favorite.
      </p>
    </div>
  );
};

export default EmptyFavorite;
