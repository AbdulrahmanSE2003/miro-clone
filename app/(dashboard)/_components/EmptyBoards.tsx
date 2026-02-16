"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/app/hooks/useApiMutation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { organization } = useOrganization();

  const { pending, mutate } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;

    mutate({ orgId: organization.id, title: "Untitled" })
      .then((id) => {
        toast.success("Board created successfully!");
        // TODO: navigate to the newly created board
      })
      .catch(() => {
        toast.error("Failed to create board. Please try again.");
      });
  };

  return (
    <div className={`h-full  flex-center flex-col gap-y-5`}>
      <Image src={"/design.svg"} height={360} width={360} alt="Empty Search" />
      <h2 className={`text-2xl font-semibold `}>Create your first board.</h2>
      <p className={`text-muted-foreground text-sm `}>
        Start by creating a board for your organization.
      </p>
      <div>
        <Button disabled={pending} onClick={onClick}>
          {pending ? "Creating..." : "Create Board"}
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
