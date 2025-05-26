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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/give" element={<AddPost />} />
          </Route>
          <Route path="/get" element={<GetFreePage />} />
          <Route path="/map" element={<ItemMap />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
