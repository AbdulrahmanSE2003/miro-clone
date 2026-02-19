import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface HintProps {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

const Hint = ({
  children,
  label,
  side = "bottom",
  sideOffset = 10,
  align,
  alignOffset,
}: HintProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className={`text-white bg-black border-black`}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <p className={`font-semibold capitalize`}>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Hint;
