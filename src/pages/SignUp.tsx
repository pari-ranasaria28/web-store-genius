
import { Navigate } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { useAuth } from "../contexts/AuthContext";

const UserSignUp = () => {
  const { user } = useAuth();
  
  // If already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Sign Up</h1>
            <p className="text-slate-500 mt-2">
              Create an account to start shopping.
            </p>
          </div>
          
          <SignUp 
            signInUrl="/login"
            afterSignUpUrl="/"
            fallbackRedirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
