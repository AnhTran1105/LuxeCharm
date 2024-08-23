import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductCreating from "./pages/Products/ProductCreating";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissMessage } from "./redux/notification/notificationSlice.js";
import LoaderPortal from "./components/LoaderPortal.jsx";
import { HashLoader } from "react-spinners";
import Product from "./pages/Products/Product.jsx";
import ProductUpdating from "./pages/Products/ProductUpdating.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route
            path="/products/:id/update-product"
            element={<ProductUpdating />}
          />
          <Route path="products/create-product" element={<ProductCreating />} />
        </Route>
      </Routes>
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
    </BrowserRouter>
  );
}
