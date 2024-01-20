import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Products from "./pages/products/Products";
import NewProduct from "./pages/products/NewProduct";

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
          <Route path="/productos" element={<Products />}/>
          <Route path="/nuevo-producto" element={<NewProduct />}/>
        </Routes>
      </section>
    </>
  );
}

export default App;
