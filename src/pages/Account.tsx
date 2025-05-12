
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Account = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "555-123-4567",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    bio: "I'm a tech enthusiast who loves shopping for the latest gadgets and home decor items."
  });
  
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const mockOrders = [
    {
      id: "ORD-1024",
      date: "2023-04-15",
      status: "Delivered",
      total: 129.99,
      items: 2
    },
    {
      id: "ORD-1023",
      date: "2023-03-29",
      status: "Delivered",
      total: 85.98,
      items: 1
    },
    {
      id: "ORD-1022",
      date: "2023-03-10",
      status: "Delivered",
      total: 249.99,
      items: 3
    }
  ];

  return (
    <MainLayout>
      <div className="ecommerce-container py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Profile Information</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      value={profile.city}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                      State
                    </label>
                    <Input
                      id="state"
                      name="state"
                      value={profile.state}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
                      Zip Code
                    </label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={profile.zipCode}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-1">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Order History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-200">
                      <th className="pb-3 font-medium text-slate-600">Order ID</th>
                      <th className="pb-3 font-medium text-slate-600">Date</th>
                      <th className="pb-3 font-medium text-slate-600">Items</th>
                      <th className="pb-3 font-medium text-slate-600">Total</th>
                      <th className="pb-3 font-medium text-slate-600">Status</th>
                      <th className="pb-3 font-medium text-slate-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-100">
                        <td className="py-4 font-medium text-slate-800">{order.id}</td>
                        <td className="py-4 text-slate-600">{order.date}</td>
                        <td className="py-4 text-slate-600">{order.items}</td>
                        <td className="py-4 text-slate-800">${order.total.toFixed(2)}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {mockOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-500">No orders found.</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Account;
