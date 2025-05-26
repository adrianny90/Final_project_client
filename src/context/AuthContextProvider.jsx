import { createContext, useEffect, useState } from "react";
import { me, signOut } from "../utils/auth.js";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthContextProvider = ({ children ,fetchUser= true}) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(fetchUser)
  console.log("User: ", user);

  useEffect(() => {
    const getUser = async () => {
      if(!fetchUser) return;
      try {
        const userData = await me();
        if (userData?.email) setUser(userData);
        // setUser(null);
      } catch (error) {
        console.log("Auth error",error?.response?.status || error.message);
      }finally {
        setLoading(false);
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
    loading
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
