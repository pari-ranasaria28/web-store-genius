
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRound, Mail, ShieldCheck } from "lucide-react";

const Account = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) {
    return (
      <MainLayout>
        <div className="ecommerce-container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <p>Please login to view your account details.</p>
            <Button asChild className="mt-4">
              <a href="/login">Login</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="ecommerce-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Account</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 border-b">
                  <UserRound className="text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium">{user.name || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 border-b">
                  <Mail className="text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2">
                  <ShieldCheck className="text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Account Type</p>
                    <p className="font-medium">{user.isAdmin ? "Administrator" : "Customer"}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500">You haven't placed any orders yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
