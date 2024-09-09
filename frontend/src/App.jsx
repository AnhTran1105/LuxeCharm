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
        <Route path="/" element={<Home />} />
        <Route path="/collections/jewelry" element={<Jewelry />} />
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
      </Routes>
      <Footer />
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
      {/* <div className="fixed w-[235px] bottom-[20px] left-[15px] z-[999] bg-[#666] flex justify-center items-center px-3 py-2">
        <button className="rounded-[2px] mr-3 mt-[3px] text-lg tracking-[1.2px] text-white uppercase flex justify-center items-center">
          Unlock 20% Off
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="fill-white"
            id="close"
          >
            <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </button>
      </div>
      <div className="fixed border bottom-[20px] rounded-full right-[15px] z-[999] bg-[#f3efeb] flex justify-center items-center p-3">
        <span className="rounded-[2px] mr-2 text-lg tracking-[1.2px] text-[#706962] uppercase flex justify-center items-center">
          <svg
            className="fill-[#706962]"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            xmlSpace="preserve"
            aria-hidden="true"
          >
            <g></g>
            <g></g>
            <g></g>
            <g>
              <g>
                <g>
                  <path d="M11,12.3V13c0,0-1.8,0-2,0v-0.6c0-0.6,0.1-1.4,0.8-2.1c0.7-0.7,1.6-1.2,1.6-2.1c0-0.9-0.7-1.4-1.4-1.4 c-1.3,0-1.4,1.4-1.5,1.7H6.6C6.6,7.1,7.2,5,10,5c2.4,0,3.4,1.6,3.4,3C13.4,10.4,11,10.8,11,12.3z"></path>
                  <circle cx="10" cy="15" r="1"></circle>
                </g>
                <path d="M10,2c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S5.6,2,10,2 M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0 L10,0z"></path>
              </g>
            </g>
          </svg>
        </span>
        <span className="text-[#706962] font-SofiaBold font-bold leading-normal">
          Help
        </span>
      </div> */}
    </BrowserRouter>
  );
}
