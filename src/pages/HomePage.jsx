import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-[0]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.1)" }}
          preload="metadata"
          onError={() => console.error("Video failed to load")}
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative flex flex-col items-center justify-center min-h-screen ">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-4 text-gray-900">
            Welcome to BerlinGive – Share and Connect in Berlin!
          </h1>
          <p className="py-2 text-base sm:text-lg text-black">
            BerlinGive is your go-to platform for giving away and finding free
            items in Berlin. Whether you want to declutter by sharing unused
            stuff or discover something new nearby, we’ve got you covered. Use
            our interactive map to locate free items in your area, and stay
            updated on upcoming local events like festivals and flohmarkts
            happening in your neighborhood. Join our community and make the most
            of Berlin’s sharing spirit!
          </p>
          <div className="py-6">
            <Link
              to="/give"
              className="inline-block px-6 py-3 border border-gray-800 rounded-full text-gray-900 hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
