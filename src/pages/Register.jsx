import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signUp } from "../utils/auth.js";
import { useAuth } from "../hooks/useAuth.js";
import { toast } from "react-toastify";

const Register = () => {
  const [{ firstName, lastName, email, password, confirmPassword }, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!firstName || !lastName || !email || !password || !confirmPassword)
        throw new Error("All fields are required.");
      if (password !== confirmPassword)
        throw new Error("Passwords do not match.");
      console.log(password.length, "dlugosc");
      if (password.length < 4)
        throw new Error("Password must contain minimum 4 characters.");

      setLoading(true);
      const res = await signUp({ firstName, lastName, email, password });
      if (res.message === "User with such email already exists") {
        toast.error("User with such email already exists! 😕", {
          ariaLabel: "Login error",
        });
      } else {
        console.log("response", res.message);

        toast.success("You are almost with us, please verify your email! 😎", {
          ariaLabel: "Registration successful",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <form
      className="min-h-screen bg-gray-900 flex items-center flex-col p-4"
      onSubmit={handleSubmit}
    >
      <p className="text-3xl mt-6">Please sign up!</p>

      <label className="input input-bordered flex items-center mt-6 m-4 gap-2 bg-gray-700 border-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          name="firstName"
          value={firstName}
          onChange={handleChange}
          className="grow text-white placeholder-gray-400"
          placeholder="First name"
        />
      </label>

      <label className="input input-bordered flex items-center m-4 gap-2 bg-gray-700 border-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          name="lastName"
          value={lastName}
          onChange={handleChange}
          className="grow text-white placeholder-gray-400"
          placeholder="Last name"
        />
      </label>

      <label className="input input-bordered flex items-center gap-2 m-4 bg-gray-700 border-gray-600">
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

      <label className="input input-bordered flex items-center gap-2 m-4 bg-gray-700 border-gray-600">
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

      <label className="input input-bordered flex items-center gap-2 m-4 bg-gray-700 border-gray-600">
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
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          type="password"
          className="grow text-white placeholder-gray-400"
          placeholder="Confirm your password..."
        />
      </label>

      <small className="text-center text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Log in!
        </Link>
      </small>

      <button
        className="px-6 py-3 my-5 bg-gray-600 text-white font-semibold rounded-full hover:bg-green-500 hover:text-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Create Account
      </button>
    </form>
  );
};

export default Register;
