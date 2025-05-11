
import { useAuth } from "../../contexts/AuthContext";
import { Menu, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const AdminHeader = ({ sidebarOpen, toggleSidebar }: AdminHeaderProps) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/admin" className="text-xl font-bold text-emerald-600">
            ModernShop Admin
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-slate-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors">
              <User size={20} />
              <span className="hidden sm:inline">{user?.name || user?.email}</span>
            </button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-4 border-b border-slate-100">
                <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              
              <ul className="py-2">
                <li>
                  <Link to="/admin/profile" className="px-4 py-2 text-sm hover:bg-slate-100 block">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings" className="px-4 py-2 text-sm hover:bg-slate-100 block">
                    Settings
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logout} 
                    className="px-4 py-2 text-sm text-left w-full hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
