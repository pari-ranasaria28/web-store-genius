
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { Question } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <MainLayout>
      <div className="ecommerce-container py-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Question className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days, and Next Day delivery is also an option for most locations in the continental US.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We accept returns within 30 days of delivery for a full refund or exchange. Items must be in original condition with tags attached and original packaging.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="order-tracking">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Once your order ships, you'll receive a shipping confirmation email with tracking information. You can also track your order by logging into your account on our website.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="international">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Currently, we ship to the United States and Canada. For other international destinations, please contact our customer service for assistance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranties">
              <AccordionTrigger className="text-lg font-medium text-slate-800">
                Do your products come with a warranty?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, all of our products come with a minimum 1-year warranty against manufacturing defects. Some products offer extended warranties. Please check the product page for specific warranty information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </MainLayout>
  );
};

export default Faq;
