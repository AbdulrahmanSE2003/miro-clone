import { useApiMutation } from "@/app/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type NewBoardButtonProps = {
  orgId: string;
  disabled: boolean;
};

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({ orgId, title: "Untitled" })
      .then((id) => {
        toast.success("Board created successfully");
        // TODO: navigate to the new board (/board/${id})
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };
  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-100/127 rounded-lg flex items-center justify-center flex-col py-6 text-muted-foreground bg-blue-600 hover:bg-blue-800 transition-colors duration-300 cursor-pointer",
        pending || disabled ? "cursor-not-allowed opacity-50" : "",
      )}
    >
      <Plus className={`h-12 w-12 text-white stroke-1`} />
      <p className={`text-xs text-white font-light`}>New Board</p>
    </button>
  );
};

export default NewBoardButton;
