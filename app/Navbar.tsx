"use client";

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import SearchInput from "./(dashboard)/_components/SearchInput";
import InviteButton from "./(dashboard)/_components/InviteButton";

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className={`flex items-center gap-x-4 p-5`}>
      <div className={`hidden lg:flex lg:flex-1`}>
        <SearchInput />
      </div>
      <div className={`block lg:hidden flex-1`}>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
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
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  );
};

export default Navbar;
