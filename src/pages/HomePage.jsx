import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="absolute inset-0 w-full h-full z-[-2] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ filter: "brightness(1.2)" }}
          preload="auto"
          onError={() => {
            console.error("Video failed to load:");
          }}
          onLoadedData={() => console.log("Video loaded successfully")}
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="  flex items-center flex-col bg-gradient-to-b from-white/100 to-transparent ">
        <div className="">
          <h1 className="text-xl font-bold py-4 text-gray-900">
            Welcome to BerlinGive – Share and Connect in Berlin!
          </h1>
        </div>
        <div className="max-w-md">
          <p className="py-2 text-black">
            BerlinGive is your go-to platform for giving away and finding free
            items in Berlin. Whether you want to declutter by sharing unused
            stuff or discover something new nearby, we’ve got you covered. Use
            our interactive map to locate free items in your area, and stay
            updated on upcoming local events like festivals and flohmarkts
            happening in your neighborhood. Join our community and make the most
            of Berlin’s sharing spirit!
          </p>
        </div>
        <div className="py-6 flex items-center">
          <Link to="/give" className="btn border border-gray-300 rounded-full ">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
