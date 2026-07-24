export const metadata = {
  title: 'Privacy Policy',
  description: 'How ShopBolt collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-page__updated">Last updated: [DATE]</p>

      <p>
        [COMPANY LEGAL NAME] (&quot;ShopBolt&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy.
        This policy explains what information we collect when you use this
        site, how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact and shipping details you provide at checkout (name, email, address, phone).</li>
        <li>Order details (items purchased, amounts, order history).</li>
        <li>Payment information, which is collected and processed directly by our payment processor, Snipcart, and its payment partners — we do not store full card numbers on our servers.</li>
        <li>Basic usage data (pages visited, browser/device type) via analytics, if enabled.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To process and fulfill orders, and to communicate about them.</li>
        <li>To respond to customer support requests.</li>
        <li>To improve the site and product catalog.</li>
        <li>To comply with legal and tax obligations.</li>
      </ul>

      <h2>Third parties</h2>
      <p>
        We share the minimum information necessary with the third-party
        services that run this store, including Snipcart (cart, checkout,
        payment processing, and order/shipping notifications) and our
        hosting provider. Each of these has its own privacy policy governing
        how they handle your data.
      </p>

      <h2>Cookies</h2>
      <p>
        This site and its checkout provider use cookies to keep your cart in
        sync and, if enabled, to measure site usage. You can control cookies
        through your browser settings.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your
        personal information by contacting us at [SUPPORT EMAIL]. Depending
        on where you live, you may have additional rights under laws such as
        the GDPR or CCPA.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at [SUPPORT EMAIL].
      </p>

      <p className="legal-page__updated">
        This is a template and does not constitute legal advice. Have it
        reviewed by a lawyer before publishing.
      </p>
    </main>
  )
}
