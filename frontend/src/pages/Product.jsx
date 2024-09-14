import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import CustomPaging from "../components/CustomPaging";
import InfoDisclosure from "../components/InfoDisclosure";
import Button from "../components/Button";
import Reviews from "../components/Reviews";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import { useSearchParams } from "react-router-dom";
import ButtonTag from "../components/CustomTags/ButtonTag";
import { StripeIcon } from "../components/SVG";

function Product() {
  const [product, setProduct] = useState();
  const [metal, setMetal] = useState();
  const [metalImages, setMetalImages] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuantity(value === "" ? "" : Math.max(1, Number(value)));
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get(`/products/${id}`);
        setProduct(productResponse);
        setMetal(searchParams.get("metal") || productResponse.metals[0].metal);
        setMetalImages(
          productResponse.metals.find(
            (item) => item.metal === productResponse.metals[0].metal
          ).images
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, searchParams]);

  useEffect(() => {
    if (metal) {
      setMetalImages(
        product.metals.find((item) => item.metal === metal).images
      );
    }
  }, [metal, product]);

  return (
    product && (
      <>
        <section className="pt-9 pb-3 px-[50px]">
          <div className="flex">
            <div className="max-w-[55%] w-[55%]">
              <CustomPaging
                imageUrls={[
                  metalImages.primary,
                  metalImages.secondary,
                  ...metalImages.others,
                ]}
              />
            </div>
            <div className="pl-[50px] max-w-[45%] w-[45%]">
              <div className="mb-4">
                <h1 className="text-[22px]">{product.name}</h1>
              </div>
              <div className="my-4 flex items-center gap-3">
                <Rating
                  transition={true}
                  size={20}
                  initialValue={Math.round(product.rating.avgRating * 10) / 10}
                  fillColor="#a16854"
                  SVGclassName={`inline-block`}
                  readonly={true}
                  allowFraction={true}
                />
                <div className="mt-1">
                  {product.rating.count}{" "}
                  {product.rating.count > 1 ? "Reviews" : "Review"}
                </div>
              </div>
              {product.salePrice ? (
                <div className="my-4 flex items-center">
                  <span className="text-text-secondary line-through mr-4">
                    ${product.price}.00
                  </span>
                  <span className="mr-2 text-lg">${product.salePrice}.00</span>
                  <span className="bg-primary w-fit px-3 py-1 rounded-full text-xs text-white">
                    Sale
                  </span>
                </div>
              ) : (
                <div className="my-4">${product.price}.00</div>
              )}
              <div className="my-4">
                <p className="text-sm text-text-secondary mb-3">Metal</p>
                <div className="flex gap-3">
                  {product.metals.map((item) => (
                    <ButtonTag
                      key={item.metal}
                      buttonType="rounded"
                      className={
                        item.metal === metal
                          ? "bg-black text-white hover:text-white cursor-default"
                          : ""
                      }
                      onClick={() => {
                        setMetal(item.metal);
                        setSearchParams(`metal=${item.metal}`);
                      }}
                    >
                      {item.metal}
                    </ButtonTag>
                  ))}
                </div>
              </div>
              <div className="my-4">
                {product.metals.find((item) => item.metal === metal).quantity <
                5 ? (
                  <p
                    className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-text-secondary"
                    role="status"
                  >
                    <svg width="15" height="15" aria-hidden="true">
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="7.5"
                        className="fill-[#f19226]/30"
                      ></circle>
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="5"
                        stroke="rgb(255, 255, 255)"
                        strokeWidth="1"
                        className="fill-[#f19226]"
                      ></circle>
                    </svg>
                    Low stock
                  </p>
                ) : (
                  <p
                    className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-text-secondary"
                    role="status"
                  >
                    <svg
                      width="15"
                      height="15"
                      aria-hidden="true"
                      className="fill-[rgb(62,214,96)]"
                    >
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="7.5"
                        className="fill-[rgb(62,214,96,0.3)]"
                      ></circle>
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r="5"
                        stroke="rgb(255, 255, 255)"
                        strokeWidth="1"
                        className="fill-[rgb(62,214,96)]"
                      ></circle>
                    </svg>
                    {product.quantity <= 5 ? "Low stock" : "In stock"}
                  </p>
                )}
              </div>
              <div className="my-4">
                <p className="text-sm text-text-secondary mb-3">Quantity</p>
                <div className="quantity">
                  <button
                    className={`quantity-button ${
                      quantity === 1 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                    onClick={handleDecrease}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      className={`w-[10px]`}
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
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    min={1}
                  />

                  <button className="quantity-button" onClick={handleIncrease}>
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
              <div className="my-4 space-y-4 max-w-[440px]">
                <ButtonTag
                  onClick={() =>
                    dispatch(handleAddToCart({ ...product, metal, quantity }))
                  }
                >
                  Add to cart
                </ButtonTag>
                <ButtonTag
                  onClick={() =>
                    dispatch(handleAddToCart({ ...product, metal, quantity }))
                  }
                  className="bg-[#646fde] border-none text-white flex justify-center items-center gap-2 hover:bg-[#5762c1] py-0"
                >
                  Buy with
                  <StripeIcon width={45.5} height={45.5} />
                </ButtonTag>
              </div>
              <div className="border-b border-border-primary/15">
                <p className="my-6 text-xs text-text-secondary">
                  {product.description}
                </p>
              </div>
              <InfoDisclosure
                title="Materials"
                content={product.metals.map((item) => ({
                  key: item.metal,
                  value: item.material,
                }))}
              />
              <InfoDisclosure
                title="Dimensions"
                content={product.dimensions.map((item) => ({
                  key: item.key,
                  value: item.value,
                }))}
              />
              <InfoDisclosure
                title="Care Instructions"
                content={product.careInstructions.map((item) => ({
                  key: item.key || item.type,
                  value: item.value || item.content,
                }))}
              />
            </div>
          </div>
        </section>
        <Reviews productId={product._id} avgRating={product.rating.avgRating} />
      </>
    )
  );
}

export default Product;
