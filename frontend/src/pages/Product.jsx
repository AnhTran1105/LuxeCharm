import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import CustomPaging from "../components/CustomPaging";

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get(`/products/${id}`);
        setProduct(productResponse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  console.log(product);

  return (
    product && (
      <section className="pt-9 pb-3 px-[50px]">
        <div className="flex">
          <div className="max-w-[55%] w-[55%]">
            <CustomPaging otherImages={product.imageUrls} />
          </div>
          <div className="pl-[50px] max-w-[45%] w-[45%]">
            <div className="mb-[15px]">
              <h1 className="text-[22px]">{product.name}</h1>
            </div>
            <div className="my-[15px]">
              <div></div>
              <div>0 Reviews</div>
            </div>
            <div className="my-[15px] text-lg">${product.price}.00</div>
            <div className="my-[15px]">
              <p className="text-[13px] text-foreground75 mb-3">Metal</p>
              <div className="flex gap-2">
                {product.metals.map((item) =>
                  item.quantity > 0 ? (
                    <button
                      className="py-[10px] px-[20px] rounded-full border border-solid border-color-foreground/35 hover:border-color-foreground tracking-[1px] leading-none text-sm first:bg-color-foreground first:text-white"
                      key={item.metal}
                    >
                      {item.metal}
                    </button>
                  ) : (
                    <button disabled key={item.metal} className="border">
                      {item.metal}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="my-[15px]">
              <p
                className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-foreground75"
                role="status"
              >
                <svg width="15" height="15" aria-hidden="true">
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="7.5"
                    fill="rgb(62,214,96, 0.3)"
                  ></circle>
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="5"
                    stroke="rgb(255, 255, 255)"
                    strokeWidth="1"
                    fill="rgb(62,214,96)"
                  ></circle>
                </svg>
                In stock
              </p>
            </div>
            <div className="my-[15px]">
              <p className="text-[13px] text-foreground75 mb-3">Quantity</p>
              <div className="quantity">
                <button className="quantity-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    className="w-[10px]"
                    fill="none"
                    viewBox="0 0 10 2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <input
                  className="quantity-input"
                  type="number"
                  min={1}
                  step={1}
                  defaultValue={1}
                />
                <button className="quantity-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    className="w-[10px]"
                    fill="none"
                    viewBox="0 0 10 10"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="my-[15px] max-w-[440px]">
              <button className="text-center w-full border border-solid px-[30px] h-[45px] text-[15px]">
                Add to cart
              </button>
            </div>
            <p className="my-[25px] text-xs text-foreground75">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    )
  );
}

export default Product;
