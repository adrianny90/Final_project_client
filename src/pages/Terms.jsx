import { Link } from "react-router-dom";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-200">
            Terms & Guidelines
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please follow these simple rules to help keep this a friendly, fair, and helpful place.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Allowed content */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Allowed</h2>
            <p className="text-gray-300">
              Only posts offering or requesting free, legal, and family-friendly items are allowed.
              Please be respectful and polite when posting or messaging others.
            </p>
          </section>

          {/* Not allowed */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Not Allowed</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>No buying, selling, trading, bartering, or requesting money</li>
              <li>No alcohol, tobacco, weapons, or prescription drugs</li>
              <li>No services or jobs</li>
              <li>No promotions, advertising, or spam</li>
              <li>No real estate, rentals, or housing offers</li>
              <li>No coupons or vouchers</li>
            </ul>
          </section>

          {/* Reselling policy */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Reselling Policy</h2>
            <p className="text-gray-300">
              If you plan to resell items, you must clearly state it in your posts and messages.
              This gives item givers the choice to decide whether they want their items to be resold.
            </p>
          </section>

          {/* Local group differences */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Local Group Variations</h2>
            <p className="text-gray-300 mb-2">
              Some rules may vary depending on the moderators of your local group. For example:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Most groups don’t allow animal or pet posts</li>
              <li>Borrowing requests may or may not be allowed</li>
              <li>Reposting rules vary: offers can usually be reposted after a few days, requests after a few weeks</li>
            </ul>
          </section>

          {/* Reporting and help */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Need Help or Saw a Rule Violation?</h2>
            <p className="text-gray-300 mb-2">
              If a post breaks a rule, please <strong>report the post</strong>.  
              If a member behaves inappropriately, please <strong>report the member</strong>.
            </p>
            <p className="text-gray-300">
              Not sure about a rule in your group? <strong>Contact your moderators</strong> directly.
            </p>
          </section>

          {/* Final message */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Thank you for helping keep this space friendly and fair!
            </h2>
            <p className="text-gray-400">
              Together, we can make this a great place to give and receive.
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

export default Terms;
