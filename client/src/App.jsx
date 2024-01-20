import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <section className="flex w-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </section>
    </>
  );
}

export default App;
