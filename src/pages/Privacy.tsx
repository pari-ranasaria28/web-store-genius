
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { FileText } from "lucide-react";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="ecommerce-container py-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-800">Privacy Policy</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Introduction</h2>
            <p className="text-slate-600">
              This Privacy Policy describes how ModernShop collects, uses, and discloses your personal information when you visit our website, make a purchase, or interact with us in any way. By using our services, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Information We Collect</h2>
            <p className="text-slate-600 mb-2">When you visit our site, we collect certain information about your device, including:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Personal information (name, address, email, phone number)</li>
              <li>Order information (products purchased, payment details)</li>
              <li>Usage data (how you interact with our website)</li>
              <li>Technical data (IP address, browser type, device information)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">How We Use Your Information</h2>
            <p className="text-slate-600 mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders, products, and services</li>
              <li>Provide customer support</li>
              <li>Improve and optimize our website and services</li>
              <li>Protect against fraud and unauthorized transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Sharing Your Information</h2>
            <p className="text-slate-600">
              We share your personal information with service providers who help us operate our business (payment processors, shipping companies), when required by law (to comply with legal obligations), and with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Your Rights</h2>
            <p className="text-slate-600 mb-2">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Objection to certain processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Changes to This Policy</h2>
            <p className="text-slate-600">
              We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions or concerns about our Privacy Policy, please contact us at privacy@modernshop.com or through our Contact page.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
