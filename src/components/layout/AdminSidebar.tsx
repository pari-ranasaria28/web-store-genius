
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  List,
  Users,
  ShoppingCart
} from "lucide-react";

type AdminSidebarProps = {
  isOpen: boolean;
};

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <List size={20} />
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <Users size={20} />
    }
  ];

  return (
    <aside 
      className={`bg-white shadow-md fixed left-0 top-16 bottom-0 transition-all duration-300 z-10 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 py-3 px-4 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-slate-100"
                }`}
              >
                <span className="text-slate-600">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
