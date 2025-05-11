
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getOrderById, Order } from "../../data/orders";
import { ArrowLeft } from "lucide-react";

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<Order["status"]>("pending");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // In a real app, this would be an API call
      const foundOrder = getOrderById(id);
      if (foundOrder) {
        setOrder(foundOrder);
        setStatus(foundOrder.status);
      }
      setIsLoading(false);
    }
  }, [id]);
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Order["status"]);
  };
  
  const handleUpdateStatus = () => {
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      if (order) {
        const updatedOrder = { ...order, status };
        setOrder(updatedOrder);
      }
      setIsLoading(false);
    }, 500);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  
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
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </AdminLayout>
    );
  }
  
  if (!order) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-slate-600 mb-4">Order not found.</p>
          <Link to="/admin/orders" className="btn-primary">
            Back to Orders
          </Link>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/admin/orders"
              className="flex items-center text-emerald-600 hover:text-emerald-700 mb-2"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Orders
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Order {order.id}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <select
                value={status}
                onChange={handleStatusChange}
                className="input-field"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleUpdateStatus}
              disabled={status === order.status}
              className={`btn-primary ${status === order.status ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Update Status
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Order Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-200">
                      <th className="pb-3 font-medium text-slate-600">Product</th>
                      <th className="pb-3 font-medium text-slate-600">Price</th>
                      <th className="pb-3 font-medium text-slate-600">Quantity</th>
                      <th className="pb-3 font-medium text-slate-600 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-4 text-slate-800 font-medium">{item.name}</td>
                        <td className="py-4 text-slate-600">${item.price.toFixed(2)}</td>
                        <td className="py-4 text-slate-600">{item.quantity}</td>
                        <td className="py-4 text-slate-800 font-medium text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-200">
                      <td colSpan={3} className="py-4 text-right font-semibold text-slate-800">
                        Order Total
                      </td>
                      <td className="py-4 text-right font-semibold text-emerald-600">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Shipping Address</h2>
              <p className="text-slate-600">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Payment Information</h2>
              <p className="text-slate-600">
                <span className="font-medium text-slate-700">Payment Method:</span> {order.paymentMethod}
              </p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Order ID</p>
                  <p className="font-medium text-slate-800">{order.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-1">Order Date</p>
                  <p className="font-medium text-slate-800">{formatDate(order.date)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-1">Customer</p>
                  <p className="font-medium text-slate-800">{order.customer.name}</p>
                  <p className="text-slate-600">{order.customer.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-1">Order Status</p>
                  <p className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Order Total</p>
                  <p className="font-semibold text-lg text-emerald-600">${order.total.toFixed(2)}</p>
                </div>
                
                <div className="pt-4">
                  <Link
                    to={`mailto:${order.customer.email}`}
                    className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-center block transition"
                  >
                    Contact Customer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetail;
