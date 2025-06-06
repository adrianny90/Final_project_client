import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../utils/auth.js";
import { useAuth } from "../hooks/useAuth.js";
import { toast } from "react-toastify";

const Login = () => {
  const [{ email, password }, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);
      const data = await signIn({ email, password });
      console.log(data, "data");

      if (
        data.message === "Invalid body" ||
        data.message === "Something went wrong"
      ) {
        toast.error("Login failed, check your credentials! 😕", {
          ariaLabel: "Login error",
        });
      } else {
        toast.success("Welcome back, you’re in! 😎", {
          ariaLabel: "Login success",
        });
      }

      setUser(data.userResponse);

      if (user?.userResponse) navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <form
      className="min-h-screen bg-gray-900 flex  justify-center p-4"
      onSubmit={handleSubmit}
    >
      <div className="max-w-md w-full flex flex-col gap-4 m-4 items-center text-white">
        <p className="text-3xl mt-6">Please log in!</p>
        <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 m-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            className="grow text-white placeholder-gray-400"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 bg-gray-700 border-gray-600 m-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            className="grow text-white placeholder-gray-400"
            placeholder="Password"
          />
        </label>

        <small className="text-center text-gray-300 m-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Register!
          </Link>
        </small>

        <button
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed m-3"
          disabled={loading}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
