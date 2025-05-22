import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { AuthContextProvider } from "../context/AuthContextProvider.jsx";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="bottom-left" autoClose={1500} theme="colored" />
      <AuthContextProvider>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </AuthContextProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
