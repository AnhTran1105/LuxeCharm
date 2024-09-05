import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";

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
                src={product.backgroundImage}
                className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
              />
              <img
                alt={product.name}
                src={product.hoverImage}
                loading="lazy"
                className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[300ms] ease-linear"
              ></img>
            </div>
            {/* {isOff && (
                <div className="absolute top-0 left-0">
                  <div className="p-[10px]">
                    <div className="bg-badge-background pt-[5px] pb-[6px] px-[12px] flex justify-center items-center border border-badge-background rounded-full text-xs leading-[1]">
                      <span className="mb-[-3px]">27% Off</span>
                    </div>
                  </div>
                </div>
              )} */}
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
                <div className="mt-[7px]">
                  <span>${product.price}.00</span>
                </div>
              </div>
            </div>
          </a>
          {product.quantities.length > 1 ? (
            <button className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 text-[15px]">
              <span>Choose options</span>
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch(handleAddToCart({ product: product, quantity: 1 }))
              }
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 text-[15px]"
            >
              <span>Add to cart</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
