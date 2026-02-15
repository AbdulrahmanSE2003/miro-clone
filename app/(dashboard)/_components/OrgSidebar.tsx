"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const OrgSidebar = () => {
  const searchparams = useSearchParams();
  const favorites = searchparams.get("favorites");
  return (
    <div
      className={`hidden min-h-screen lg:flex flex-col space-y-6 w-51.75 p-4 py-6 border-r border-zinc-400/40`}
    >
      <Link href={"/"}>
        <div className={`flex items-center justify-start gap-3`}>
          <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
          <span className="font-semibold text-3xl tracking-widest">Miro</span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #c9cacc",
              justifyContent: "space-between",
              backgroundColor: "#eee",
            },
          },
        }}
      />

      <div className={`space-y-1 w-full`}>
        <Button
          asChild
          size={"lg"}
          variant={favorites ? "ghost" : "secondary"}
          className={`font-normal justify-start px-2 w-full`}
        >
          <Link href={"/"}>
            <LayoutDashboard className="h-4 -4 mr-2 " />
            Team Boards
          </Link>
        </Button>

        <Button
          asChild
          size={"lg"}
          variant={favorites ? "secondary" : "ghost"}
          className={`font-normal justify-start px-2 w-full`}
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 -4 mr-2 " />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
