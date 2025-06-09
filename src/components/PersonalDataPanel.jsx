import { useAuth } from "../hooks/useAuth.js";
import { toast } from "react-toastify";
import { updateUser } from "../utils/auth.js";

const PersonalDataPanel = () => {
  const { setUser, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  //handle submit for personal data
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //   console.log(user);
      if (!user.firstName || !user.lastName || !user.email) {
        throw new Error("At least name and email are required");
      }
      const data = await updateUser(user);
      toast.info("Changes are made! 👋", {
        ariaLabel: "Submitted",
      });
    } catch (error) {
      toast.error("Something went wrong, try again later. 😕", {
        ariaLabel: "Submit error",
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
          Personal Information
        </h2>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">
            First name:
          </span>
          <input
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter first name"
          />
        </label>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">Last name:</span>
          <input
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter last name"
          />
        </label>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">Email:</span>
          <input
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter email"
          />
        </label>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">Street:</span>
          <input
            name="address.street"
            value={user.address?.street || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter street"
          />
        </label>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">
            House number:
          </span>
          <input
            name="address.houseStreet"
            value={user.address?.houseStreet || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter house number"
          />
        </label>
        <label className="block mb-3 sm:mb-4">
          <span className="text-gray-300 text-sm sm:text-base">
            Postal code:
          </span>
          <input
            name="address.postalCode"
            value={user.address?.postalCode || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter postal code"
          />
        </label>
        <label className="block mb-3 sm:mb-6">
          <span className="text-gray-300 text-sm sm:text-base">City:</span>
          <input
            name="address.city"
            value={user.address?.city || ""}
            onChange={handleChange}
            className="mt-1 w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter city"
          />
        </label>
        <label className="block mb-4 sm:mb-6">
          <span className="text-gray-300 text-sm sm:text-base">Created:</span>
          <input
            name="created"
            value={user.createdAt?.split("T")[0] || ""}
            disabled
            className="mt-1 w-full p-2 bg-gray-600 text-white border border-gray-600 rounded-lg cursor-not-allowed text-sm sm:text-base"
            placeholder="Creation date"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-600 hover:bg-green-500 text-white rounded-lg  transition-all duration-200 text-sm sm:text-base"
        >
          Submit Changes
        </button>
      </form>
    </>
  );
};
export default PersonalDataPanel;
