
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page or process
    navigate("/checkout");
  };
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-slate-600 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Items ({items.length})
                </h2>
                
                <div className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <CartItem 
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div>
              <CartSummary 
                subtotal={subtotal} 
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
