import { useParams, Link, useNavigate } from "react-router";
import { verifyUser } from "../utils/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Verify = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const tokenToSend = { verificationToken: token };

  const handleVerify = async () => {
    try {
      const data = await verifyUser(tokenToSend);
      console.log(data);

      toast.success(data.message || "Account verified successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.message || "Error verifying account");
    } finally {
    }
  };
  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold py-4">Please verify your account</h1>
      <button
        onClick={handleVerify}
        className="btn border border-gray-300 rounded-full"
      >
        Click to confirm your account
      </button>
      <div className="py-6">
        <Link to="/" className="btn border border-gray-300 rounded-full">
          Refuse
        </Link>
      </div>
    </div>
  );
};

export default Verify;
