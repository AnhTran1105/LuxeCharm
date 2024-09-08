import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import Button from "./Button";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const dispatch = useDispatch();

  return (
    <ul
      role="list"
      className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3"
    >
      {products.map((product) => (
        <li
          key={product._id}
          className="group cursor-pointer relative carousel-item"
        >
          <a href={`/products/${product._id}`} className="">
            <div className="relative overflow-hidden">
              <img
                loading="lazy"
                alt={product.name}
                src={product.metals[0].imageUrls[0]}
                className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
              />
              <img
                alt={product.name}
                src={product.metals[0].imageUrls[1]}
                loading="lazy"
                className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[300ms] ease-linear"
              ></img>
            </div>
            {product.salePrice && (
              <div className="absolute top-3 left-3">
                <span className="bg-primary w-fit px-3 py-2 rounded-full text-xs text-white">
                  {Math.ceil(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}
                  % Off
                </span>
              </div>
            )}
            <div className="py-[10px] pb-[17px] text-center text-sm">
              <h3>
                <a
                  href="/"
                  className="group-hover:underline underline-offset-3px"
                >
                  {product.name}
                </a>
              </h3>
              <div>
                {product.salePrice ? (
                  <div className="mt-2">
                    <span className="text-foreground75 line-through mr-4">
                      ${product.price}.00
                    </span>
                    <span className="mr-2">${product.salePrice}.00</span>
                  </div>
                ) : (
                  <div className="mt-2">${product.price}.00</div>
                )}
              </div>
            </div>
          </a>
          {product.metals.length > 1 ? (
            <Button title="Choose options" />
          ) : (
            <Button
              title="Add to cart"
              onClick={() => dispatch(handleAddToCart(product))}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
