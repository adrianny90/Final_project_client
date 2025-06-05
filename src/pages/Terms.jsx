import { Link } from "react-router-dom";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-12 text-center">
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-green-500 opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-blue-500 opacity-20 blur-xl"></div>
          <h1 className="relative text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            What are the rules and guidelines?
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Please follow these simple rules to help keep this a friendly, fair, and helpful place.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Allowed content */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-green-400">
              ✅ Allowed
            </h2>
            <p className="text-gray-300">
              Only posts offering or requesting free, legal, and family-friendly items are allowed.  
              Please be respectful and polite when posting or messaging others.
            </p>
          </div>

          {/* Not allowed */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-red-400">
              ❌ Not allowed
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>No buying, selling, trading, bartering, or requesting money</li>
              <li>No alcohol, tobacco, weapons, or prescription drugs</li>
              <li>No services or jobs</li>
              <li>No promotions, advertising, or spam</li>
              <li>No real estate, rentals, or housing offers</li>
              <li>No coupons or vouchers</li>
            </ul>
          </div>

          {/* Reselling policy */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/30">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-400">
              ♻️ Reselling Policy
            </h2>
            <p className="text-gray-300">
              If you plan to resell items, you must clearly state it in your posts and messages. This gives item givers the choice to decide whether they want their items to be resold.
            </p>
          </div>

          {/* Local group differences */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-yellow-400">
              📍 Local group variations
            </h2>
            <p className="text-gray-300 mb-2">
              Some rules may vary depending on the moderators of your local group. For example:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Most groups don’t allow animal or pet posts</li>
              <li>Borrowing requests may or may not be allowed</li>
              <li>Reposting rules vary: offers can usually be reposted after a few days, requests after a few weeks</li>
            </ul>
          </div>

          {/* Reporting and help */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-pink-400">
              🚨 Need help or saw a rule violation?
            </h2>
            <p className="text-gray-300 mb-2">
              If a post breaks a rule, please <strong>report the post</strong>.  
              If a member behaves inappropriately, please <strong>report the member</strong>.
            </p>
            <p className="text-gray-300">
              Not sure about a rule in your group? <strong>Contact your moderators</strong> directly.
            </p>
          </div>

          {/* Final message */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">
              Thank you for helping keep this space friendly and fair!
            </h2>
            <p className="text-gray-400">
              Together, we can make this a great place to give and receive.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
