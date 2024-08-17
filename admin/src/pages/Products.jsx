import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCreating from "./Products/ProductCreating";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="mt-10">
      <ul role="list" className="grid grid-cols-5 gap-3 px-[15px]">
        <li>
          <ProductCard />
        </li>
        <li>
          <ProductCard />
        </li>
        <li>
          <ProductCard isOptional={true} />
        </li>
        <li>
          <ProductCard isOff={true} />
        </li>
        <li>
          <ProductCard isOptional={true} />
        </li>
      </ul>
    </div>
  );
}

export default Products;
