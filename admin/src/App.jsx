import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductCreating from "./pages/Products/ProductCreating";

export default function App() {
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
