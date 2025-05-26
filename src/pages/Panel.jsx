import { useAuth } from "../hooks/useAuth.js";

const Panel = () => {
  const { setUser, user } = useAuth();
  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <>
      <label className="text-gray-300 input input-bordered flex items-center mt-6 m-4 gap-2 bg-gray-700 border-gray-600">
        First name:
        <input
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          className="grow text-white placeholder-gray-400"
          placeholder={user.firstName}
        />
      </label>
      <label className="text-gray-300 input input-bordered flex items-center mt-6 m-4 gap-2 bg-gray-700 border-gray-600">
        Last name:
        <input
          name="lasName"
          value={user.lastName}
          onChange={handleChange}
          className="grow text-white placeholder-gray-400"
          placeholder={user.lastName}
        />
      </label>
      <label className="text-gray-300 input input-bordered flex items-center mt-6 m-4 gap-2 bg-gray-700 border-gray-600">
        Email:
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          className="grow text-white placeholder-gray-400"
          placeholder={user.email}
        />
      </label>
      <label className="text-gray-300 input input-bordered flex items-center mt-6 m-4 gap-2 bg-gray-700 border-gray-600">
        Created:
        <input
          name="created"
          value={user.createdAt.split("T")[0]}
          className="grow text-white placeholder-gray-400"
          placeholder={user.createdAt.split("T")[0]}
        />
      </label>
    </>
  );
};
export default Panel;
