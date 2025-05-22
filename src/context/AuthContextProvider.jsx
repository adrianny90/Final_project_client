import { createContext, useEffect, useState } from "react";
import { me, signOut } from "../utils/auth.js";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("User: ", user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        if (userData?.email) setUser(userData);
        // setUser(null);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const logOut = async () => {
    try {
      await signOut(); //Cookie will be deleted
      setUser(null); //User data will be deleted
      toast.success("Logout succeeded");
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    user,
    setUser,
    logOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
