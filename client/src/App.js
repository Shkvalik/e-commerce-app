import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar";
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartPage } from './pages/CartPage'
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessModal from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import AdminPanelPage from "./pages/AdminPanelPage";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<LandingPage />} />
          <Route path={'/products'} element={<ProductsPage />} />
          <Route path={'/product/:id'} element={<ProductDetailPage />} />
          <Route path={'/cart'} element={<CartPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/registration'} element={<RegistrationPage />} />
          <Route path={'/profile'} element={<ProfilePage />} />
          <Route path={'/checkout'} element={<CheckoutPage />} />
          <Route path={'/order-success'} element={<PaymentSuccessModal />} />
          <Route path={'/your-orders'} element={<UserOrdersPage />} />
          <Route path={'/admin-panel'} element={<AdminPanelPage />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider >
  );
}

export default App;
