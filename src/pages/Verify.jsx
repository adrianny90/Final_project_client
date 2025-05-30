// pages/Verify.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "../utils/auth";
import { toast } from "react-toastify";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyUser(token); // Pass token directly
        console.log(data);
        setStatus("Verification successful!");
        toast.success(data.message || "Account verified successfully!");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("Verification failed");
        toast.error(error.message || "Error verifying account");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-black font-bold py-4 m-3">{status}</h1>
      {status === "Verification failed" && (
        <>
          <p className="text-black text-xl m-3">Try again or return to home</p>
          <div className="py-6">
            <Link
              to="/"
              className="btn border border-gray-300 rounded-full m-1 hover:bg-green-500 hover:text-gray-900 transition-colors duration-300"
            >
              Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Verify;
