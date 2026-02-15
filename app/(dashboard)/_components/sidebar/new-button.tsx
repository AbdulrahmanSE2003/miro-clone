"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Hint from "@/components/Hint";

const NewButton = () => {
  return (
    <Dialog>
      <Hint
        label="create organization"
        side="right"
        align="center"
        alignOffset={18}
      >
        <DialogTrigger asChild>
          <button
            aria-label="create organization"
            className="p-2 bg-white/25 hover:bg-white/20 transition rounded-md cursor-pointer flex items-center justify-center"
          >
            <Plus className="text-white" />
          </button>
        </DialogTrigger>
      </Hint>
      <DialogContent className={`p-0 max-w-108 `}>
        <CreateOrganization routing="hash" afterCreateOrganizationUrl="/" />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
