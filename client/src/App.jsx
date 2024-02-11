import { Routes, Route, Router } from "react-router-dom";
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
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import ColorsPage from "./pages/colors/ColorsPage";
import FormColors from "./pages/colors/FormColors";
import SizesPage from "./pages/sizes/sizesPage";
import FormSize from "./pages/sizes/FormSize";
import UserPage from "./pages/users/UserPage";
import "./App.css";
import CommentsPage from "./pages/comments/CommentsPage";
import { OrderContextProvider } from "./context/orderContext";
import CreateOrderPage from "./pages/orders/CreateOrderPage";
import CartPage from "./pages/Cart/CartPage";
import OrdersPage from "./pages/orders/OrdersPage";

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
          <Route
            path="/editar-producto/:id"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormProduct edit={true} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <CategorysPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nueva-categoria"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormCategorys edit={false} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/editar-categoria/:id"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormCategorys edit={true} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/comentarios"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <CommentsPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/colores"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <ColorsPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuevo-color"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormColors edit={false} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-color/:id"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormColors edit={true} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sizes"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <SizesPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuevo-sizes"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormSize edit={false} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-sizes/:id"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <FormSize edit={true} />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <UserPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <AdminRoutes>
                  <OrdersPage />
                </AdminRoutes>
              </ProtectedRoute>
            }
          />
          {/*This routes are protected for user client*/}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ClientRoutes>
                  <Profile />
                </ClientRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ayuda"
            element={
              <ProtectedRoute>
                <ClientRoutes>
                  <Help />
                </ClientRoutes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/carrito"
            element={
              <OrderContextProvider>
                <ProtectedRoute>
                  <ClientRoutes>
                    <CartPage />
                  </ClientRoutes>
                </ProtectedRoute>
              </OrderContextProvider>
            }
          />
          <Route
            path="/crear-pedido"
            element={
              <OrderContextProvider>
                <ProtectedRoute>
                  <ClientRoutes>
                    <CreateOrderPage />
                  </ClientRoutes>
                </ProtectedRoute>
              </OrderContextProvider>
            }
          />
          {/*This routes not are protected*/}
          <Route path="/catalogo" element={<CataloguePage />} />
          <Route path="/catalogo/:id" element={<ProductCatalogue />} />
          <Route path="/nuevos-productos" element={<NewPage />} />
          <Route path="lista-categorias" element={<ListCategoryPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ruta-privada" element={<NotAuthorized />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
