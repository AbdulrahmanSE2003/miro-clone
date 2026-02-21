"use client";

import { useOthersConnectionIds, useOther } from "@liveblocks/react";
import { memo } from "react";
import Cursor from "./Cursor";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke, colorToCSS } from "@/lib/utils";

// Renders one other user's live pencil draft stroke
const DraftPath = memo(({ connectionId }: { connectionId: number }) => {
  const pencilDraft = useOther(connectionId, (other) => other.presence.pencilDraft);
  const color = useOther(connectionId, (other) => other.presence.penColor);

  if (!pencilDraft || pencilDraft.length < 2) return null;

  const stroke = getStroke(pencilDraft as number[][], {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return (
    <path
      fill={color ? colorToCSS(color) : "#000"}
      d={getSvgPathFromStroke(stroke)}
    />
  );
});
DraftPath.displayName = "DraftPath";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const CursorsPresence = memo(() => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {/* Render remote pencil drafts */}
      {ids.map((connectionId) => (
        <DraftPath key={connectionId} connectionId={connectionId} />
      ))}
      {/* Render remote cursors */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
export default CursorsPresence;
