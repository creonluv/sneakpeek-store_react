import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { MainPage } from "./pages/main-page";
import { CatalogPage } from "./pages/catalog-page";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { StrictMode } from "react";
import { AsideProvider } from "./context/AsideContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductPage } from "./pages/product-page/ProductPage";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import { BucketPage } from "./pages/bucket-page";
import { FavouritePage } from "./pages/favourite-page";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import ProfilePage from "./pages/profile-page/ProfilePage";

export const Root = () => {
  return (
    <AuthProvider>
      <AsideProvider>
        <Provider store={store}>
          <StrictMode>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<MainPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="login" element={<LoginPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="catalog" element={<CatalogPage />} />
                    <Route path="product/:productId" element={<ProductPage />} />
                    <Route path="bucket" element={<BucketPage />} />
                    <Route path="favourite" element={<FavouritePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Route>

                  <Route
                    path="*"
                    element={
                      <div>
                        <h1>404 - Page Not Found</h1>
                        <p>Sorry, the page you're looking for doesn't exist.</p>
                      </div>
                    }
                  />
                </Route>
              </Routes>
            </Router>
          </StrictMode>
        </Provider>
      </AsideProvider>
    </AuthProvider>
  );
};
