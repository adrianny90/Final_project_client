import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddPost from "./pages/AddPost.jsx";
import GetItems from "./pages/GetItems.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/give" element={<AddPost />} />
          <Route path="/get" element={<GetItems />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
