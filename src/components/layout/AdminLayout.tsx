
import { ReactNode, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Navigate } from "react-router-dom";
import { Shield } from "lucide-react";

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
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Access denied page for non-admin users
  if (!user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-6">
            You don't have admin privileges to access this area. Please contact an administrator if you believe this is an error.
          </p>
          <div className="flex justify-center">
            <a 
              href="/" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
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
