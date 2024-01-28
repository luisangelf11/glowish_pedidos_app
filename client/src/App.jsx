import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Products from "./pages/products/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalogue from "./pages/catalogue/Catalogue";
import AdminRoutes from "./components/AdminRoutes";
import ClientRoutes from "./components/ClientRoutes";
import { AuthContextProvider } from "./context/authContext";
import FormProduct from "./pages/products/FormProduct";
import NotAuthorized from "./pages/NotAuthorized";
import CategorysPage from "./pages/categorys/CategorysPage";
import FormCategorys from "./pages/categorys/FormCategorys";


function App() {
  return (
    <>
    <AuthContextProvider>
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
                  <FormProduct edit={false} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route path="/editar-producto/:id" element={
            <ProtectedRoute>
              <AdminRoutes>
                <FormProduct edit={true}/>
              </AdminRoutes>
            </ProtectedRoute>
          }/>
          <Route path="/categorias" element={
            <ProtectedRoute>
              <AdminRoutes>
                <CategorysPage />
              </AdminRoutes>
            </ProtectedRoute>
          } />
           <Route path="/nueva-categoria" element={
            <ProtectedRoute>
              <AdminRoutes>
                <FormCategorys edit={false} />
              </AdminRoutes>
            </ProtectedRoute>
          } />
          
          <Route path="/editar-categoria/:id" element={
            <ProtectedRoute>
              <AdminRoutes>
                <FormCategorys edit={true} />
              </AdminRoutes>
            </ProtectedRoute>
          } />
          {/*This routes not are protected*/}
          <Route
            path="/catalogo"
            element={
                  <Catalogue />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ruta-privada" element={<NotAuthorized />}/>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
