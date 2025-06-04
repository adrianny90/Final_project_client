import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { AuthContextProvider } from "../context/AuthContextProvider.jsx";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <ToastContainer position="bottom-left" autoClose={1500} theme="colored" />
      <AuthContextProvider fetchUser={true}>
        <Header />
        <main className="flex-grow container mx-auto px-0 py-0 text-white">
          <Outlet />
        </main>
      </AuthContextProvider>
      <Footer />
    </div>
  );
};
export default MainLayout;
