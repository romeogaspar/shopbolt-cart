export const metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of ShopBolt and your orders.',
}

export default function TermsPage() {
  return (
    <main className="legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-page__updated">Last updated: [DATE]</p>

      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of this
        website, operated by [COMPANY LEGAL NAME] (&quot;ShopBolt&quot;,
        &quot;we&quot;, &quot;us&quot;). By using this site or placing an
        order, you agree to these Terms.
      </p>

      <h2>Orders and payment</h2>
      <p>
        All orders are subject to acceptance and availability. Prices are
        shown in USD and are exclusive of applicable taxes and shipping
        unless stated otherwise. Payment is processed securely through
        Snipcart and its payment partners at the time of checkout.
      </p>

      <h2>Product information</h2>
      <p>
        We try to display product details, pricing, and availability
        accurately, but errors may occur. We reserve the right to correct
        pricing or availability errors and to cancel affected orders, in
        which case you will be refunded in full.
      </p>

      <h2>Shipping and returns</h2>
      <p>
        See our <a href="/shipping-returns">Shipping &amp; Returns</a> page
        for delivery timelines, costs, and our return/refund policy.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse this site, including attempting to interfere
        with its normal operation, submitting fraudulent orders, or
        infringing the intellectual property of ShopBolt or others.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, ShopBolt is not liable for
        indirect, incidental, or consequential damages arising from your use
        of this site or its products.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        site after changes take effect constitutes acceptance of the
        updated Terms.
      </p>

      <h2>Governing law</h2>
      <p>These Terms are governed by the laws of [JURISDICTION].</p>

      <h2>Contact</h2>
      <p>Questions about these Terms? Email us at [SUPPORT EMAIL].</p>

      <p className="legal-page__updated">
        This is a template and does not constitute legal advice. Have it
        reviewed by a lawyer before publishing.
      </p>
    </main>
  )
}
