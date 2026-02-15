import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/OrgSidebar";
import Navbar from "./_components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <main className={`h-screen`}>
      <Sidebar />
      <div className={`pl-15 h-full flex-1`}>
        <div className={`flex h-full`}>
          <OrgSidebar />
          <div className={`h-full flex flex-col flex-1 min-h-screen`}>
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
