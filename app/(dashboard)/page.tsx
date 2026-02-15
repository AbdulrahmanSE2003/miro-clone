"use client";

import { use } from "react";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/EmptyOrg";
import BoardList from "./_components/BoardList";

interface DashboardProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const BoardPage = ({ searchParams }: DashboardProps) => {
  const { organization } = useOrganization();

  const resolvedSearchParams = use(searchParams);

  return (
    <div className={`flex flex-col flex-1 h-[calc(100%-80px)] gap-y-4 p-6`}>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={resolvedSearchParams} />
      )}
    </div>
  );
};

export default BoardPage;
