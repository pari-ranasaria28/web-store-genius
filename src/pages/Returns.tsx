
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { Undo } from "lucide-react";

const Returns = () => {
  return (
    <MainLayout>
      <div className="ecommerce-container py-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Undo className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-800">Returns & Refunds</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Return Policy</h2>
            <p className="text-slate-600 mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns within 30 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">How to Return an Item</h2>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>Log into your account and find the order you wish to return</li>
              <li>Select the items you wish to return and the reason for the return</li>
              <li>Print the prepaid return label that will be sent to your email</li>
              <li>Package your return securely using the original packaging if possible</li>
              <li>Drop off your package at any authorized shipping location</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Return Conditions</h2>
            <p className="text-slate-600 mb-4">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Unused and in the same condition that you received it</li>
              <li>In the original packaging</li>
              <li>Accompanied by the receipt or proof of purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Refund Process</h2>
            <p className="text-slate-600">
              Once we receive your return, we will inspect the item and notify you that we've received it. We will immediately process your refund, which may take 5-7 business days to appear on your original payment method.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Returns;
