
import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Search, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  joinDate: string;
};

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-123-4567",
    orders: 3,
    joinDate: "2023-05-15"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-987-6543",
    orders: 1,
    joinDate: "2023-06-22"
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-456-7890",
    orders: 5,
    joinDate: "2022-12-10"
  },
  {
    id: "4",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "555-789-0123",
    orders: 0,
    joinDate: "2023-10-05"
  }
];

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setCustomers(mockCustomers);
  }, []);

  // Filter customers based on search query
  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)
      )
    : customers;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="pl-10"
              />
            </div>
            <div>
              <span className="text-slate-500">
                {filteredCustomers.length} customers
              </span>
            </div>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-1 text-slate-400" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-1 text-slate-400" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500">No customers found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
