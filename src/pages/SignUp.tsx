
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const UserSignUp = () => {
  const { user } = useAuth();
  const [accountType, setAccountType] = useState<"user" | "admin">("user");
  
  // If already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">Sign Up</CardTitle>
            <CardDescription className="text-slate-500 mt-2">
              Create an account to start shopping or managing your store.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <RadioGroup 
                defaultValue="user" 
                className="grid grid-cols-2 gap-4"
                onValueChange={(value) => setAccountType(value as "user" | "admin")}
              >
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="cursor-pointer">Customer Account</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-slate-50">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">Admin Account</Label>
                </div>
              </RadioGroup>
            </div>
            
            <SignUp 
              signInUrl="/login"
              afterSignUpUrl={accountType === "admin" ? "/admin" : "/"}
              fallbackRedirectUrl={accountType === "admin" ? "/admin" : "/"}
              appearance={{
                elements: {
                  formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700"
                }
              }}
              unsafeMetadata={{
                role: accountType
              }}
            />
            
            {accountType === "admin" && (
              <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                <p>You're creating an admin account. This will give you access to the store management dashboard.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSignUp;
