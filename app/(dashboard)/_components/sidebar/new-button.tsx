"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-ui";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-2 bg-white/10 hover:bg-white/20 transition rounded-md cursor-pointer flex items-center justify-center">
          <Plus className="text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className={`p-0 max-w-108 `}>
        <VisuallyHidden.Root>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to start collaborating
          </DialogDescription>
        </VisuallyHidden.Root>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
