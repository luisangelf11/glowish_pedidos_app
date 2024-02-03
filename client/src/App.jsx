import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Products from "./pages/products/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import CataloguePage from "./pages/catalogue/CataloguePage";
import AdminRoutes from "./components/AdminRoutes";
import ClientRoutes from "./components/ClientRoutes";
import { AuthContextProvider } from "./context/authContext";
import FormProduct from "./pages/products/FormProduct";
import NotAuthorized from "./pages/NotAuthorized";
import CategorysPage from "./pages/categorys/CategorysPage";
import FormCategorys from "./pages/categorys/FormCategorys";
import NewPage from "./pages/catalogue/NewPage";
import ListCategoryPage from "./pages/catalogue/ListCategoryPage";
import ProductCatalogue from "./pages/catalogue/ProductCatalogue";


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
          <Route path="/catalogo" element={<CataloguePage />}/>
          <Route path="/catalogo/:id" element={<ProductCatalogue />}/>
          <Route path="/nuevos-productos" element={<NewPage />}/>
          <Route path="lista-categorias" element={<ListCategoryPage />}/>
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
