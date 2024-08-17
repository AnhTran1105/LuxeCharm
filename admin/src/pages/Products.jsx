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
    <div className="mt-10 flex flex-col gap-5 px-[15px]">
      <div className="flex gap-4">
        <a className="button" href="/products/create-products">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="fill-color-foreground mr-2"
            id="add"
          >
            <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          <span>Create new products</span>
        </a>
        <a className="button" href="/products/create-products">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="fill-color-foreground mr-2"
            id="add"
          >
            <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          <span>Create new products</span>
        </a>
      </div>
      <ul
        role="list"
        className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3"
      >
        <ProductCard />
        <ProductCard />
        <ProductCard isOptional={true} />
        <ProductCard isOff={true} />
        <ProductCard isOptional={true} />
      </ul>
    </div>
  );
}

export default Products;
