import LegalPageNav from '@/components/LegalPageNav';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LegalPageNav />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">By accessing or using VibeCheck, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">2. Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300">VibeCheck provides AI-powered analysis of social media content to help users improve engagement and avoid posting content that might be perceived negatively. Our service evaluates content based on various factors including engagement potential, relatability, originality, clarity, and trendiness.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">To use certain features of the Service, you must register for an account. You are responsible for:</p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Maintaining the confidentiality of your account information</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-3">We reserve the right to refuse service, terminate accounts, or remove content at our discretion.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">4. Subscription and Payments</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">VibeCheck offers subscription-based services. By subscribing to our service:</p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>You agree to pay all fees associated with your subscription plan</li>
              <li>Subscriptions automatically renew unless canceled before the renewal date</li>
              <li>You authorize us to charge your payment method for the subscription fees</li>
              <li>Refunds are provided in accordance with our refund policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">5. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300">The Service and its original content, features, and functionality are owned by VibeCheck and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">6. User Content</h2>
            <p className="text-gray-600 dark:text-gray-300">You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display the content in connection with the Service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">7. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">In no event shall VibeCheck, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">8. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">If you have any questions about these Terms, please contact us at:</p>
            <p className="mt-2 text-blue-600 dark:text-blue-400">teckmillion17@gmail.com</p>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}
