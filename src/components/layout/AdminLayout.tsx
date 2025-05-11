
import { ReactNode, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Navigate } from "react-router-dom";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Redirect if not authenticated or not an admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className={`flex-1 transition-all duration-300 p-6 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
