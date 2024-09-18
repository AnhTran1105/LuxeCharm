import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jewelry from "./pages/Jewelry";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissMessage } from "./redux/notification/notificationSlice.js";
import LoaderPortal from "./components/LoaderPortal.jsx";
import { HashLoader } from "react-spinners";
import Cart from "./components/Cart.jsx";
import Account from "./pages/Account.jsx";
import Checkout from "./pages/Checkout.jsx";
import VerifyOrder from "./pages/VerifyOrder.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import CheckoutError from "./pages/CheckoutError.jsx";
import { fetchCart } from "./redux/cart/cartSlice.js";
import OptionsModal from "./components/OptionsModal.jsx";
import Layout from "./components/Layout.jsx";
import AllJewelry from "./pages/AllJewelry.jsx";

export default function App() {
  const root = document.querySelector("#root");

  const dispatch = useDispatch();

  const { message, type, showToast } = useSelector(
    (state) => state.notification
  );
  const { isLoading } = useSelector((state) => state.loading);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isLoading || isOpen) {
      root?.classList.add("brightness-50");
    } else {
      root?.classList.remove("brightness-50");
    }
  }, [isLoading, isOpen, root?.classList]);

  useEffect(() => {
    if (showToast) {
      switch (type) {
        case "info":
          toast.info(message);
          break;
        case "success":
          toast.success(message);
          break;
        case "warning":
          toast.warning(message);
          break;
        case "error":
          toast.error(message);
          break;
        default:
          toast(message);
          break;
      }
    }

    dispatch(dismissMessage());
  }, [message, type, showToast, dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/jewelry/:category" element={<Jewelry />} />
            <Route path="/all-jewelry" element={<AllJewelry />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/collections/bestsellers" element={<BestSellers />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/verify" element={<VerifyOrder />} />
              <Route
                path="/checkout/success/:orderId"
                element={<CheckoutSuccess />}
              />
              <Route path="/checkout/error" element={<CheckoutError />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
      <LoaderPortal>
        {isLoading && (
          <HashLoader
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="!fixed top-[50%] left-[50%] z-[60] mt-[-75px] ml-[-75px]"
            color="rgb(161, 104, 84)"
          />
        )}
      </LoaderPortal>
      <Cart />
      <OptionsModal />
    </BrowserRouter>
  );
}
