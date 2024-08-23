import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import CustomPaging from "../../components/CustomPaging";

function Product() {
  const [product, setProduct] = useState();
  const [images, setImages] = useState([]);
  const [metal, setMetal] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get(`/products/${id}`);
        setProduct(productResponse);
        setImages(
          [
            ...productResponse.imageUrls,
            productResponse.hoverImage,
            productResponse.backgroundImage,
          ].reverse()
        );
        setMetal(productResponse.quantities[0].metal);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    product && (
      <section className="pt-9 pb-3 px-[50px]">
        <div className="flex">
          <div className="max-w-[55%] w-[55%]">
            <CustomPaging images={images} />
          </div>
          <div className="pl-[50px] max-w-[45%] w-[45%] relative">
            <a
              href={`/products/${product._id}/update-product`}
              className="button absolute top-0 right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 101 101"
                width={24}
                height={24}
                className="mr-2"
                id="edit"
              >
                <path d="M82.2 79.2H18.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h63.4c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4zM16.5 58.2l-.1 11.3c0 .6.2 1.3.7 1.7.5.4 1.1.7 1.7.7l11.3-.1c.6 0 1.2-.3 1.7-.7l38.8-38.8c.9-.9.9-2.5 0-3.4L59.4 17.7c-.9-.9-2.5-.9-3.4 0l-7.8 7.8-31 31c-.5.5-.7 1.1-.7 1.7zm49-27.6L61.1 35l-7.8-7.8 4.4-4.4 7.8 7.8zM21.3 59.2l28.6-28.6 7.8 7.8L29.1 67h-7.8v-7.8z"></path>
              </svg>
              Edit
            </a>
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
              <div className="flex gap-4">
                {product.quantities.map((item) =>
                  item.quantity > 0 ? (
                    <button
                      className={`py-[10px] px-[20px] rounded-full border border-solid border-color-foreground/35 hover:border-color-foreground tracking-[1px] leading-none text-sm ${
                        metal === item.metal && "bg-color-foreground text-white"
                      }`}
                      key={item.metal}
                      onClick={() => setMetal(item.metal)}
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
              <p className="text-[13px] text-foreground75 mb-3">
                Quantity:{" "}
                {
                  product.quantities.find((item) => item.metal === metal)
                    .quantity
                }
              </p>
            </div>
            <p className="my-[15px] text-xs text-foreground75">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    )
  );
}

export default Product;
