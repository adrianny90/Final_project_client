import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { AuthContextProvider } from "../context/AuthContextProvider.jsx";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      <div className="relative z-10 flex flex-col min-h-screen">
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          theme="colored"
        />
        <AuthContextProvider>
          <Header />
          <main className="">
            <Outlet />
          </main>
        </AuthContextProvider>
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
