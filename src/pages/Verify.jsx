import { useParams, Link, useNavigate } from "react-router";
import { verifyUser } from "../utils/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Verify = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  console.log(token, "here token");

  const handleVerify = async () => {
    try {
      const data = await verifyUser(token);
      console.log(data);

      toast.success(data.message || "Account verified successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.message || "Error verifying account");
    } finally {
    }
  };
  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-2xl text-black font-bold py-4 m-3">
        Please verify your account
      </h1>
      <button
        onClick={handleVerify}
        className="btn border border-gray-300 rounded-full m-1 hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 "
      >
        Click to confirm your account
      </button>
      <p className="text-black text-xl m-3">or</p>
      <div className="py-6">
        <Link
          to="/"
          className="btn border border-gray-300 rounded-full m-1 hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
        >
          Refuse
        </Link>
      </div>
    </div>
  );
};

export default Verify;
