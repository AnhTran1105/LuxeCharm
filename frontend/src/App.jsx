import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/bestsellers" element={<BestSellers />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
