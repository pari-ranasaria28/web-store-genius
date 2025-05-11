
import { useNavigate } from "react-router-dom";
import { getRecentOrders, Order } from "../../data/orders";

const RecentOrders = () => {
  const orders = getRecentOrders();
  const navigate = useNavigate();
  
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <button
          onClick={() => navigate("/admin/orders")}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="pb-3 font-medium text-slate-600 text-sm">Order ID</th>
              <th className="pb-3 font-medium text-slate-600 text-sm">Customer</th>
              <th className="pb-3 font-medium text-slate-600 text-sm">Date</th>
              <th className="pb-3 font-medium text-slate-600 text-sm">Total</th>
              <th className="pb-3 font-medium text-slate-600 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => navigate(`/admin/orders/${order.id}`)}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                <td className="py-4 text-sm font-medium text-slate-800">{order.id}</td>
                <td className="py-4 text-sm text-slate-600">{order.customer.name}</td>
                <td className="py-4 text-sm text-slate-600">{formatDate(order.date)}</td>
                <td className="py-4 text-sm text-slate-800">${order.total.toFixed(2)}</td>
                <td className="py-4">
                  <span className={`text-xs py-1 px-2 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
