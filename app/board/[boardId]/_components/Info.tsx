"use client";

import Actions from "@/app/(dashboard)/_components/Actions";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/useRename";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

type InfoProps = {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className={`text-neutral-300 px-1.5 touch-none pointer-events-none`}>
      |
    </div>
  );
};

const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div
      className={`absolute top-2 left-2 bg-white rounded-md px-2.5 h-12 flex items-center shadow-md`}
    >
      <Hint label="Go To Boards">
        <Button
          variant={"board"}
          className={`px-2 transition-colors duration-300`}
        >
          <Link href={"/"} className={`flex-center gap-2`}>
            <Image src={"/logo.png"} alt="Board Logo" width={30} height={30} />

            <span
              className={
                (cn("font-semibold text-2xl ml-2 text-black"), font.className)
              }
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename Board">
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant={"board"}
          className={`text-base font-normal px-2`}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title}>
        <div>
          <Hint label="Main Menu">
            <Button variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;

export const InfoSkeleton = () => {
  return (
    <div
      className={`absolute top-2 left-2 bg-white rounded-md px-2.5 h-12 flex items-center shadow-md w-75`}
    ></div>
  );
};
