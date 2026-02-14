import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/OrgSidebar";
import Navbar from "./_components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <main className={`h-full`}>
      <Sidebar />
      <div className={`pl-15 h-full`}>
        <div className={`flex h-full gap-x-3`}>
          <OrgSidebar />
          <div className={`h-full flex-1`}>
            {/* Add Navbar */}
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
