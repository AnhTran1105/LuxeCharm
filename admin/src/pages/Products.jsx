import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCreating from "./Products/ProductCreating";

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
      <div></div>
      <ul className="grid grid-cols-2 gap-4" role="list">
        {products.map((product) => (
          <li
            key={product._id}
            className="flex flex-col justify-center items-center"
          >
            <img />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.metal}</p>
            <p>{product.quantity}</p>
            <p>{product.price}</p>
            <p>{product.quantity > 0 ? "In stock" : "Out of stock"}</p>
          </li>
        ))}
      </ul>
      <ProductCreating />
    </div>
  );
}

export default Products;
