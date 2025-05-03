import LegalPageNav from '@/components/LegalPageNav';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LegalPageNav />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">We collect information you provide directly to us when you:</p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Create an account</li>
              <li>Use our services to analyze social media content</li>
              <li>Subscribe to our service</li>
              <li>Contact customer support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3. Information Sharing</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">We may share information about you as follows:</p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
              <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
              <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of VibeCheck or others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">4. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">5. Your Choices</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Account Information: You may update, correct, or delete information about you at any time by logging into your online account or emailing us. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">6. Changes to this Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2 text-blue-600 dark:text-blue-400">teckmillion17@gmail.com</p>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}
