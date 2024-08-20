import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductCreating from "./pages/Products/ProductCreating";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissMessage } from "./redux/notification/notificationSlice.js";

export default function App() {
  const root = document.querySelector("#root");

  const dispatch = useDispatch();

  const { message, type, showToast } = useSelector(
    (state) => state.notification
  );
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (isLoading) {
      root?.classList.add("brightness-50");
    } else {
      root?.classList.remove("brightness-50");
    }
  }, [isLoading, root?.classList]);

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
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="products/create-product" element={<ProductCreating />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
