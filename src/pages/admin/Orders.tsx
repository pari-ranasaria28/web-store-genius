
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { orders, Order } from "../../data/orders";
import { Search, Filter } from "lucide-react";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const navigate = useNavigate();
  
  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesQuery =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });
  
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="pl-10 input-field"
              />
            </div>
            <div className="w-full md:w-64 flex items-center">
              <Filter size={18} className="text-slate-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Order["status"] | "all")}
                className="input-field"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <span className="text-slate-500">
                {filteredOrders.length} orders
              </span>
            </div>
          </div>
          
          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="pb-3 font-medium text-slate-600">Order ID</th>
                  <th className="pb-3 font-medium text-slate-600">Customer</th>
                  <th className="pb-3 font-medium text-slate-600">Date</th>
                  <th className="pb-3 font-medium text-slate-600">Items</th>
                  <th className="pb-3 font-medium text-slate-600">Total</th>
                  <th className="pb-3 font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="py-4 font-medium text-slate-800">{order.id}</td>
                    <td className="py-4">
                      <div>
                        <p className="text-slate-800">{order.customer.name}</p>
                        <p className="text-sm text-slate-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600">{formatDate(order.date)}</td>
                    <td className="py-4 text-slate-600">{order.items.length}</td>
                    <td className="py-4 font-medium text-slate-800">${order.total.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
