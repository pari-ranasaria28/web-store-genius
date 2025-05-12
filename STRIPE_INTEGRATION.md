
# Stripe Integration Guide

This document provides instructions for setting up Stripe integration with Supabase Edge Functions.

## Prerequisites

1. A Stripe account
2. A Supabase project
3. Stripe API keys (test or live)

## Setup

### 1. Create a Supabase Edge Function for Stripe Checkout

Create a new Edge Function named `create-checkout` with the following code:

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Parse the request body
  const { amount, name } = await req.json();

  // Initialize Stripe
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  try {
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name || "Purchase",
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/thank-you`,
      cancel_url: `${req.headers.get("origin")}/cart`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

### 2. Set Environment Variables

In your Supabase project, set the following environment variables:

- `STRIPE_SECRET_KEY`: Your Stripe secret key

### 3. Update the StripeContext.tsx

Replace the mock implementation with a real API call to the Edge Function:

```typescript
const processPayment = async (amount: number, productName: string) => {
  try {
    toast({
      title: "Processing payment",
      description: "Please wait while we redirect you to our secure payment provider...",
    });
    
    // Call Supabase edge function to create checkout session
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { amount, name: productName },
    });
    
    if (error) throw new Error(error.message);
    
    // Redirect to Stripe checkout
    window.location.href = data.url;
  } catch (error) {
    toast({
      title: "Payment failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
  }
};
```

## Testing

1. Use Stripe test cards to simulate successful payments:
   - Test Card Number: 4242 4242 4242 4242
   - Expiration: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

2. Use the following test card to simulate a declined payment:
   - Card Number: 4000 0000 0000 0002

## Going Live

When you're ready to go live:

1. Replace your test API keys with live API keys
2. Update the success and cancel URLs if necessary
3. Test the live integration with a small transaction

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
