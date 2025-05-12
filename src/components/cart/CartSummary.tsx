
import { useStripe } from "../../contexts/StripeContext";
import { useNavigate } from "react-router-dom";

type CartSummaryProps = {
  subtotal: number;
  onCheckout: () => void;
};

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  const { processPayment } = useStripe();
  const navigate = useNavigate();
  
  // Calculate taxes (e.g., 8% of subtotal)
  const tax = subtotal * 0.08;
  
  // Fixed shipping cost (free if subtotal is over $100)
  const shipping = subtotal > 100 ? 0 : 8.95;
  
  // Total cost
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    await processPayment(total, "Shopping cart items", () => {
      navigate('/thank-you');
      onCheckout();
    });
  };
  
  return (
    <div className="bg-slate-50 rounded-lg p-6 sticky top-20">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="text-slate-800 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600">Tax (8%)</span>
          <span className="text-slate-800 font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-600">Shipping</span>
          <span className="text-slate-800 font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="border-t border-slate-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-emerald-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        className="w-full btn-primary mt-6 py-3 flex items-center justify-center"
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-4 text-xs text-slate-500 text-center">
        <p>Secure payment processing</p>
      </div>
    </div>
  );
};

export default CartSummary;
