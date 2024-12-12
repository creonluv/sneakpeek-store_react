import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";

import { WindowSizeProvider } from "./context/WindowSizeContext";
import { AsideProvider } from "./context/AsideContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";

import App from "./App";

import { MainPage } from "./pages/main-page";
import { CatalogPage } from "./pages/catalog-page";
import { ProductPage } from "./pages/product-page/ProductPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import { BucketPage } from "./pages/bucket-page";
import { FavouritePage } from "./pages/favourite-page";
import ProfilePage from "./pages/profile-page/ProfilePage";
import NotFoundPage from "./pages/notfound-page/NotFoundPage";
import { CheckoutPage } from "./pages/checkout-page";
import { ThankYouPage } from "./pages/thankyou-page";
import InDevelopmentPage from "./pages/indevelopment-page/InDevelopmentPage";

import ProtectedRoute from "./components/protected-route/ProtectedRoute";

export const Root = () => {
  return (
    <WindowSizeProvider>
      <ModalProvider>
        <AuthProvider>
          <AsideProvider>
            <Provider store={store}>
              <StrictMode>
                <Router>
                  <Routes>
                    <Route path="/" element={<App />}>
                      <Route index element={<MainPage />} />
                      <Route path="catalog" element={<CatalogPage />} />
                      <Route
                        path="product/:productId"
                        element={<ProductPage />}
                      />

                      <Route path="register" element={<RegisterPage />} />
                      <Route path="login" element={<LoginPage />} />

                      <Route element={<ProtectedRoute />}>
                        <Route path="bucket" element={<BucketPage />} />
                        <Route path="favourite" element={<FavouritePage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="thankyou" element={<ThankYouPage />} />
                      </Route>

                      <Route path="indevelopment" element={<InDevelopmentPage />} />

                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </Router>
              </StrictMode>
            </Provider>
          </AsideProvider>
        </AuthProvider>
      </ModalProvider>
    </WindowSizeProvider>
  );
};
