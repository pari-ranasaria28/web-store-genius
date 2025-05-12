
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { Truck } from "lucide-react";

const Shipping = () => {
  return (
    <MainLayout>
      <div className="ecommerce-container py-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-800">Shipping Policy</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Shipping Options</h2>
            <p className="text-slate-600 mb-4">
              We offer the following shipping options for all orders:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><span className="font-medium">Standard Shipping:</span> 5-7 business days (Free on orders over $100)</li>
              <li><span className="font-medium">Express Shipping:</span> 2-3 business days ($12.95)</li>
              <li><span className="font-medium">Next Day Delivery:</span> Next business day ($24.95)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Processing Time</h2>
            <p className="text-slate-600">
              All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Shipping Restrictions</h2>
            <p className="text-slate-600">
              We currently ship to addresses within the United States and Canada. For international shipping options, please contact our customer service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Tracking Your Order</h2>
            <p className="text-slate-600">
              Once your order ships, you will receive a shipping confirmation email with a tracking number. You can track your order at any time by logging into your account or using the tracking number provided.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shipping;
