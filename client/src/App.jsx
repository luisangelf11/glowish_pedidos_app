import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import MenuAdmin from "./components/MenuAdmin";

function App() {
  return (
    <>
      <section className="flex">
      <MenuAdmin></MenuAdmin>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
