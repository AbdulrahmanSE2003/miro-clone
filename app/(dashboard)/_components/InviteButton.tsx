import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`capitalize`} variant={"outline"}>
          <Plus className={`h-4 w-4 mr-2`} />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-220 p-0 bg-transparent border-none`}>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
