
import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, Bell } from "lucide-react";
import { Link } from "react-router-dom";

type AdminHeaderProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const AdminHeader = ({ sidebarOpen, toggleSidebar }: AdminHeaderProps) => {
  const { user } = useAuth();
  
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
          
          <div className="flex items-center gap-2">
            {user && (
              <span className="hidden sm:inline text-sm text-slate-600">
                {user.name || user.email}
              </span>
            )}
            <UserButton 
              afterSignOutUrl="/admin/login"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
