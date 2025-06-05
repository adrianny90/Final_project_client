import { Link } from "react-router-dom";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-200">
            Privacy Policy
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We respect your privacy and are committed to protecting your personal data.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Data Collection */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              What data do we collect?
            </h2>
            <p className="text-gray-300">
              We only collect the minimum necessary data to provide and improve our services. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Your email address (for account-related communication)</li>
              <li>Posts and messages you create on the platform</li>
              <li>Basic usage data for analytics (anonymized)</li>
            </ul>
          </section>

          {/* Use of Data */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              How do we use your data?
            </h2>
            <p className="text-gray-300">
              We use your data strictly for purposes related to the service:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>To manage your account and preferences</li>
              <li>To facilitate item exchange and communication</li>
              <li>To monitor platform safety and prevent abuse</li>
            </ul>
          </section>

          {/* Sharing */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Do we share your data?
            </h2>
            <p className="text-gray-300">
              No. We do not sell or share your data with third parties. Your information stays within the platform and is only used to provide the service.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Your rights
            </h2>
            <p className="text-gray-300">
              You have full control over your data. At any time, you can:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Request access to your data</li>
              <li>Request correction or deletion of your data</li>
              <li>Deactivate your account</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Simply contact us if you’d like to make a request.
            </p>
          </section>

          {/* Final */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Questions?
            </h2>
            <p className="text-gray-400">
              If you have any questions about our privacy practices, feel free to reach out.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
