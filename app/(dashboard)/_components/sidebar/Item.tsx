"use client";

import Hint from "@/components/Hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  function handleClick() {
    if (!setActive) return;

    setActive({ organization: id });
  }

  return (
    <div className={`aspect-square relative w-10`}>
      <Hint label={name} side="right" align="center" alignOffset={18}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-500",
            isActive && "border-2 border-zinc-200/70 opacity-100",
          )}
          onClick={handleClick}
        />
      </Hint>
    </div>
  );
};

export default Item;
