
import { Navigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

const UserLogin = () => {
  const { user } = useAuth();
  const [loginType, setLoginType] = useState<"admin" | "user">("user");
  
  // If already logged in, redirect to appropriate page based on user role
  if (user) {
    return <Navigate to={user.isAdmin ? "/admin" : "/"} replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">
              {loginType === "admin" ? "Admin Login" : "User Login"}
            </CardTitle>
            <CardDescription className="text-slate-500 mt-2">
              {loginType === "admin" 
                ? "Sign in to your admin account to manage your store." 
                : "Sign in to your account to start shopping."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex space-x-2 mb-6">
              <Button 
                variant={loginType === "admin" ? "default" : "outline"}
                className={`flex-1 ${loginType === "admin" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                onClick={() => setLoginType("admin")}
                size="lg"
              >
                Admin Login
              </Button>
              <Button 
                variant={loginType === "user" ? "default" : "outline"}
                className={`flex-1 ${loginType === "user" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                onClick={() => setLoginType("user")}
                size="lg"
              >
                User Login
              </Button>
            </div>
            
            <SignIn 
              signUpUrl="/sign-up"
              afterSignInUrl={loginType === "admin" ? "/admin" : "/"}
              redirectUrl={loginType === "admin" ? "/admin" : "/"}
              appearance={{
                elements: {
                  formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700"
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;
