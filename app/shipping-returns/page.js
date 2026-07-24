export const metadata = {
  title: 'Shipping & Returns',
  description: 'Shipping timelines, costs, and our return and refund policy.',
}

export default function ShippingReturnsPage() {
  return (
    <main className="legal-page">
      <h1>Shipping &amp; Returns</h1>
      <p className="legal-page__updated">Last updated: [DATE]</p>

      <h2>Shipping</h2>
      <p>
        We currently ship to [COUNTRIES/REGIONS]. Orders are typically
        processed within [X] business days. Estimated delivery times and
        shipping costs are calculated at checkout based on your address and
        selected shipping method.
      </p>

      <h2>Order tracking</h2>
      <p>
        Once your order ships, you&apos;ll receive a confirmation email with
        tracking information, if available from the carrier.
      </p>

      <h2>Returns</h2>
      <p>
        We accept returns within [X] days of delivery for items in their
        original, unused condition. To start a return, contact us at
        [SUPPORT EMAIL] with your order number.
      </p>

      <h2>Refunds</h2>
      <p>
        Once we receive and inspect your return, we&apos;ll notify you of
        the approval status. Approved refunds are issued to your original
        payment method within [X] business days.
      </p>

      <h2>Damaged or incorrect items</h2>
      <p>
        If your order arrives damaged or incorrect, contact us at
        [SUPPORT EMAIL] within [X] days of delivery and we&apos;ll arrange a
        replacement or refund at no extra cost.
      </p>

      <h2>Contact</h2>
      <p>Questions about shipping or returns? Email us at [SUPPORT EMAIL].</p>

      <p className="legal-page__updated">
        This is a template and does not constitute legal advice. Have it
        reviewed by a lawyer, and confirm it matches your actual shipping
        carrier terms and Snipcart configuration, before publishing.
      </p>
    </main>
  )
}
