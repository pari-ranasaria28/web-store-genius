
export type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export const orders: Order[] = [
  {
    id: "ORD-1001",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com"
    },
    items: [
      {
        id: "1",
        name: "Minimalist Desk Lamp",
        quantity: 1,
        price: 89.99
      },
      {
        id: "3",
        name: "Bluetooth Wireless Earbuds",
        quantity: 1,
        price: 129.99
      }
    ],
    total: 219.98,
    status: "delivered",
    date: "2023-05-15T10:30:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA"
    }
  },
  {
    id: "ORD-1002",
    customer: {
      name: "Emily Johnson",
      email: "emily.j@example.com"
    },
    items: [
      {
        id: "5",
        name: "Smart Home Hub",
        quantity: 1,
        price: 149.99
      }
    ],
    total: 149.99,
    status: "shipped",
    date: "2023-05-18T14:45:00Z",
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      country: "USA"
    }
  },
  {
    id: "ORD-1003",
    customer: {
      name: "Michael Brown",
      email: "michael.b@example.com"
    },
    items: [
      {
        id: "2",
        name: "Ergonomic Office Chair",
        quantity: 1,
        price: 249.99
      },
      {
        id: "4",
        name: "Leather Laptop Sleeve",
        quantity: 1,
        price: 59.99
      }
    ],
    total: 309.98,
    status: "processing",
    date: "2023-05-20T09:15:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "789 Pine Blvd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    }
  },
  {
    id: "ORD-1004",
    customer: {
      name: "Sophia Garcia",
      email: "sophia.g@example.com"
    },
    items: [
      {
        id: "8",
        name: "Minimalist Wall Clock",
        quantity: 2,
        price: 42.99
      }
    ],
    total: 85.98,
    status: "pending",
    date: "2023-05-21T16:20:00Z",
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "101 Cedar St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      country: "USA"
    }
  },
  {
    id: "ORD-1005",
    customer: {
      name: "David Wilson",
      email: "david.w@example.com"
    },
    items: [
      {
        id: "6",
        name: "Ceramic Pour-Over Coffee Set",
        quantity: 1,
        price: 64.99
      },
      {
        id: "7",
        name: "Wireless Charging Pad",
        quantity: 1,
        price: 34.99
      }
    ],
    total: 99.98,
    status: "cancelled",
    date: "2023-05-17T11:10:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "202 Maple Dr",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA"
    }
  }
];

export const getRecentOrders = (limit = 5) => {
  return [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getTotalRevenue = () => {
  return orders.reduce((sum, order) => sum + order.total, 0);
};

export const getOrdersByStatus = () => {
  return {
    pending: orders.filter(order => order.status === 'pending').length,
    processing: orders.filter(order => order.status === 'processing').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
  };
};

export const getOrderById = (id: string) => {
  return orders.find(order => order.id === id);
};
