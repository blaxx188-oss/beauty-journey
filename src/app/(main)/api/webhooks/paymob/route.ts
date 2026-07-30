/**
 * Paymob Webhook Handler — Processes payment notifications.
 * Handles success/failure callbacks from Paymob payment gateway.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Architecture: Verify HMAC signature
    // const signature = request.headers.get("x-hub-signature");
    // const isValid = verifyWebhookSignature(
    //   JSON.stringify(body),
    //   process.env.PAYMOB_HMAC_SECRET!,
    //   signature!
    // );
    // if (!isValid) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Extract payment data
    const paymentId = body.id;
    const success = body.success;
    const amountCents = body.amount_cents;
    const merchantOrderId = body.order?.merchant_order_id;
    const paymobOrderId = body.order?.id;

    // Architecture: In production, update order status in Supabase
    // const { data, error } = await supabaseClient
    //   .from("orders")
    //   .update({
    //     payment_status: success ? "paid" : "failed",
    //     payment_reference: paymentId,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq("id", merchantOrderId);
    //
    // if (error) {
    //   console.error("Failed to update order:", error);
    //   return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    // }

     
    // console.log("[Paymob Webhook]", { paymentId, merchantOrderId, success, amount: amountCents / 100 });

    // Return success to Paymob
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Paymob Webhook Error]", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
