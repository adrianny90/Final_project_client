import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header mit Bild */}
        <div className="text-center mb-12">
        
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-green-300">
            About Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're a community committed to sustainability, reuse, and giving secondhand items a second life.
          </p>
          <img
            src="/image/planet.jpeg"
            alt="planet hold by hands"
            className="mx-auto w-full max-w-3xl rounded-xl mb-8 shadow-lg"
          />
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Vision */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-green-200 mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Every day, tons of usable goods end up in landfills. We want to change that by making it easy for people to share, reuse, and reduce waste — while saving money and even getting to know their local community.
            </p>
          </section>

          {/* Nachhaltiger Lebensstil */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-blue-200 mb-4">Living Sustainably – Without Sacrifice</h2>
            <p className="text-gray-300">
              In times of fast fashion and mass consumption, we don’t have to give things up — we just need new ways. Reuse what already exists, and discover how much you can save while helping the planet.
            </p>
          </section>

          {/* Entdecken & Vernetzen */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-200 mb-4">Explore & Connect</h2>
            <p className="text-gray-300">
              Our map feature helps you discover local items, connect with like-minded people, and get to know your city in a new, sustainable way.
            </p>
          </section>

          {/* Ressourcen */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">Helpful Resources</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <a
                  href="Ökologischer Fußabdruck Rechner (Technische Universität Graz)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  Calculate your ecological footprint (TU GRAZ)
                </a>
              </li>
              <li>
                <a
                  href="https://www.co2-rechner.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  CO₂ savings calculator for reused items
                </a>
              </li>
              <li>
                <a
                  href="https://utopia.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  Utopia.de – Sustainable living inspiration
                </a>
              </li>
              <li>
                <a
                  href="https://www.kaufnix.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  Kaufnix.net – A secondhand community
                </a>
              </li>
            </ul>
          </section>

          {/* Abschluss */}
          <section className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">
              Join us in making secondhand the first choice.
            </h2>
            <p className="text-gray-400">
              Sustainability doesn’t have to be hard — it just needs to be easy and shared.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
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

export default About;
