"use client";

import { useOthersConnectionIds } from "@liveblocks/react";
import { memo } from "react";
import Cursor from "./Cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => {
        <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <p>
        {/* TODO  Draft Pencil*/}
        <Cursors />
      </p>
    </>
  );
});
CursorsPresence.displayName = "CursorsPresence";
export default CursorsPresence;
