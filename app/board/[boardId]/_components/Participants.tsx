"use client";

import { useOthers, useSelf } from "@liveblocks/react";
import UserAvatar from "./UserAvatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 3;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  console.log(currentUser);

  return (
    <div
      className={`absolute h-12 top-2 right-2 rounded-md px-3 shadow-md flex items-center bg-zinc-100`}
    >
      {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
        return (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.avatar}
            name={info?.name}
            fallback={info?.name?.[0] || "A"}
          />
        );
      })}

      {currentUser && (
        <UserAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}
          src={`${currentUser.info?.avatar}`}
          name={`${currentUser.info?.name} (You)`}
          fallback={currentUser.info?.name?.[0] || "Y"}
        />
      )}

      {hasMoreUsers && (
        <UserAvatar
          name={`${users.length - MAX_SHOWN_USERS} more`}
          fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
        />
      )}
    </div>
  );
};

export default Participants;

export const ParticipantsSkeleton = () => {
  return (
    <div
      className={`absolute h-12 top-2 right-2 rounded-md px-3 shadow-md flex items-center bg-zinc-100 w-25`}
    ></div>
  );
};
