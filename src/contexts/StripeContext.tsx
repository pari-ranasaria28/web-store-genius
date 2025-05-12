
import { createContext, useContext, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface StripeContextType {
  processPayment: (amount: number, productName: string) => Promise<void>;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export const StripeProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle payment processing
  const processPayment = async (amount: number, productName: string) => {
    try {
      toast({
        title: "Processing payment",
        description: "Please wait while we redirect you to our secure payment provider...",
      });
      
      // In a real app, this would be an API call to create a checkout session
      // For demo purposes, we're simulating the checkout
      
      // Simulate a successful payment and redirect
      setTimeout(() => {
        toast({
          title: "Payment successful",
          description: "Your order has been placed successfully.",
        });
        navigate('/thank-you');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <StripeContext.Provider value={{ processPayment }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};
