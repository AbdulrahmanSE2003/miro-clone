import Room from "@/components/Room";
import Canvas from "./_components/Canvas";
import Loading from "./_components/Loading";

type pageProps = {
  params: {
    boardId: string;
  };
};

const Page = async ({ params }: pageProps) => {
  const { boardId } = await params;
  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
};

export default Page;
