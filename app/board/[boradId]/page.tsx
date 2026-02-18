import Canvas from "./_components/Canvas";

type pageProps = {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({ params }: pageProps) => {
  return <Canvas boardId={params.boardId} />;
};

export default BoardIdPage;
