import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoards = () => {
  return (
    <div className={`h-full  flex-center flex-col gap-y-5`}>
      <Image src={"/design.svg"} height={360} width={360} alt="Empty Search" />
      <h2 className={`text-2xl font-semibold `}>Create your first board.</h2>
      <p className={`text-muted-foreground text-sm `}>
        Start by creating a board for your organization.
      </p>
      <div>
        <Button>Create Board</Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
