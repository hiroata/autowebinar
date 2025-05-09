// Stripe API連携ユーティリティ（雛形）
// 決済リンク生成など
export async function createStripeCheckout(): Promise<{ url: string }> {
  // TODO: Stripe API呼び出し実装
  return { url: "https://checkout.stripe.com/pay/dummy" };
}
