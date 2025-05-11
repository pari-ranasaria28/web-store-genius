
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Check } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // If user somehow lands on this page without going through checkout,
  // redirect them to the home page after a delay
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart || JSON.parse(storedCart).length === 0) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-emerald-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Thank You for Your Order!</h1>
          <p className="text-slate-600 mb-6">
            Your order has been received and is being processed.
          </p>
          
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <p className="text-slate-500 mb-2">Order Number</p>
            <p className="text-xl font-semibold text-slate-800">{orderNumber}</p>
          </div>
          
          <p className="text-slate-600 mb-8">
            We've sent a confirmation email with order details and tracking information.
            If you have any questions, please contact our customer support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/orders" className="btn-secondary">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ThankYou;
