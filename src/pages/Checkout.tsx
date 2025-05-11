
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../contexts/CartContext";

type CheckoutStep = "details" | "payment" | "confirmation";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("details");
  
  // Customer details form state
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });
  
  // Payment details form state
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  
  const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("confirmation");
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would call an API to process the order
    // For now, we'll just clear the cart and navigate to a thank you page
    clearCart();
    navigate("/thank-you");
  };
  
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="ecommerce-container py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-slate-600 mb-4">Your cart is empty. Please add items before checkout.</p>
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              Browse Products
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Calculate totals
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 8.95;
  const total = subtotal + tax + shipping;
  
  return (
    <MainLayout>
      <div className="ecommerce-container py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${currentStep === "details" || currentStep === "payment" || currentStep === "confirmation" ? "text-emerald-600" : "text-slate-400"}`}>
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mr-2">1</div>
            <span>Customer Details</span>
          </div>
          <div className="mx-4 h-1 w-8 bg-slate-200"></div>
          <div className={`flex items-center ${currentStep === "payment" || currentStep === "confirmation" ? "text-emerald-600" : "text-slate-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep === "payment" || currentStep === "confirmation" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>2</div>
            <span>Payment</span>
          </div>
          <div className="mx-4 h-1 w-8 bg-slate-200"></div>
          <div className={`flex items-center ${currentStep === "confirmation" ? "text-emerald-600" : "text-slate-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep === "confirmation" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>3</div>
            <span>Confirmation</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Details */}
            {currentStep === "details" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Customer Details
                </h2>
                
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={customerDetails.firstName}
                        onChange={handleCustomerDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={customerDetails.lastName}
                        onChange={handleCustomerDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={handleCustomerDetailsChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={customerDetails.address}
                      onChange={handleCustomerDetailsChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={customerDetails.city}
                        onChange={handleCustomerDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={customerDetails.state}
                        onChange={handleCustomerDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
                        Zip/Postal Code *
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={customerDetails.zipCode}
                        onChange={handleCustomerDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={customerDetails.country}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, country: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="USA">United States</option>
                      <option value="CAN">Canada</option>
                      <option value="GBR">United Kingdom</option>
                      <option value="AUS">Australia</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn-primary w-full py-3">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 2: Payment Details */}
            {currentStep === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Payment Details
                </h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-slate-700 mb-1">
                      Name on Card *
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      value={paymentDetails.cardName}
                      onChange={handlePaymentDetailsChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailsChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-slate-700 mb-1">
                        CVV *
                      </label>
                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep("details")}
                      className="btn-secondary flex-1 py-3"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn-primary flex-1 py-3">
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 3: Confirmation */}
            {currentStep === "confirmation" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Items</h3>
                    <div className="divide-y divide-slate-200">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center py-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="ml-4 flex-1">
                            <p className="font-medium text-slate-800">{item.name}</p>
                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Customer Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Name</p>
                        <p>{customerDetails.firstName} {customerDetails.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p>{customerDetails.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Address</p>
                        <p>
                          {customerDetails.address}, {customerDetails.city}, {customerDetails.state} {customerDetails.zipCode}, {customerDetails.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">Payment Method</h3>
                    <div>
                      <p className="text-sm text-slate-500">Credit Card</p>
                      <p>•••• •••• •••• {paymentDetails.cardNumber.slice(-4)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <button 
                      onClick={() => setCurrentStep("payment")}
                      className="btn-secondary flex-1 py-3"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder}
                      className="btn-primary flex-1 py-3"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
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
                
                <div className="border-t border-slate-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-emerald-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-slate-800">Order Items</h3>
                <ul className="space-y-2 text-sm">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.name} <span className="text-slate-500">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
