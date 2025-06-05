import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddPost from "./pages/AddPost.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import Verify from "./pages/Verify.jsx";
import GetFreePage from "./pages/GetFreePage.jsx";
import ItemMap from "./pages/ItemMap.jsx";
import ItemDetails from "./pages/ItemDetailsPage.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import Panel from "./pages/Panel.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />

          <Route
            element={
              <AuthContextProvider>
                <ProtectedLayout />
              </AuthContextProvider>
            }
          >
            <Route path="/give" element={<AddPost />} />
            <Route path="/panel" element={<Panel />} />
          </Route>

          <Route path="/get" element={<GetFreePage />} />
          <Route path="/map" element={<ItemMap />} />
          <Route path="get/items/:id" element={<ItemDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
