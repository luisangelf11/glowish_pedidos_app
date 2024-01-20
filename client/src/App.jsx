import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Products from "./pages/products/Products";
import NewProduct from "./pages/products/NewProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalogue from "./pages/catalogue/Catalogue";
import AdminRoutes from "./components/AdminRoutes";
import ClientRoutes from "./components/ClientRoutes";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <>
    <AuthContextProvider>
      <section className="flex w-screen">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <Dashboard />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <Products />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuevo-producto"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <NewProduct />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalogo"
            element={
              <ProtectedRoute>
                <ClientRoutes>
                  <Catalogue />
                </ClientRoutes>
              </ProtectedRoute>
            }
          />
          {/*This routes not are protected*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
      </AuthContextProvider>
    </>
  );
}

export default App;
