
import AdminLayout from "../../components/layout/AdminLayout";
import DashboardStats from "../../components/admin/DashboardStats";
import RecentOrders from "../../components/admin/RecentOrders";
import { useAuth } from "../../contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, {user?.name || "Admin"}!
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          
          {/* Quick Actions and Info */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-emerald-100 text-emerald-700 rounded-md text-left hover:bg-emerald-200 transition">
                  Add New Product
                </button>
                <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-md text-left hover:bg-blue-200 transition">
                  Process Orders
                </button>
                <button className="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-md text-left hover:bg-purple-200 transition">
                  Update Inventory
                </button>
                <button className="w-full py-2 px-4 bg-orange-100 text-orange-700 rounded-md text-left hover:bg-orange-200 transition">
                  View Analytics
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold mb-4">Store Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inventory Status</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Order Fulfillment</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
