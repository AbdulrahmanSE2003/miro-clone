"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/app/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "@/components/ui/button";

type ActionsProps = {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
};

const Actions = ({ id, side, sideOffset, children, title }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Board link copied to clipboard");
      });
  };

  const onDeleteBoard = () => {
    mutate({ id })
      .then(() => {
        toast.success("Board deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete board");
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
        className={`w-44`}
      >
        <DropdownMenuItem
          className={`cursor-pointer p-3 text-xs`}
          onClick={onCopyLink}
        >
          <Link2 className={`h-4 w-4 mr-2 `} />
          Copy board link
        </DropdownMenuItem>

        <ConfirmModal
          header="delete board?"
          desc={`Are you sure you want to delete the board "${title}"? This action cannot be undone.`}
          onConfirm={onDeleteBoard}
        >
          <Button
            variant="ghost"
            className={`p-3 text-red-500 hover:text-red-500 cursor-pointer text-sm font-normal w-full justify-start`}
          >
            <Trash2 className={`h-4 w-4 mr-2 text-red-500`} />
            Delete board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
