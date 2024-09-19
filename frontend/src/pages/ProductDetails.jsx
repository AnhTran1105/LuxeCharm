import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import CustomPaging from "../components/CustomPaging";
import InfoDisclosure from "../components/InfoDisclosure";
import Reviews from "../components/Reviews";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import { useSearchParams } from "react-router-dom";
import ButtonTag from "../components/CustomTags/ButtonTag";
import { StockIcon, StripeIcon } from "../components/SVG";
import { metalTypes, statusTypes } from "../constants";

function ProductDetails() {
  const [product, setProduct] = useState();
  const [metal, setMetal] = useState();
  const [status, setStatus] = useState();
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
        setMetal(searchParams.get("metal") || productResponse.metals[0].type);
        setStatus(productResponse.metals[0].status);
        setMetalImages(
          productResponse.metals.find(
            (item) => item.type === productResponse.metals[0].type
          ).images
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, searchParams]);

  useEffect(() => {
    if (metal) {
      setMetalImages(product.metals.find((item) => item.type === metal).images);
      setStatus(product.metals.find((item) => item.type === metal).status);
    }
  }, [metal, product]);

  console.log(status === "lowStock");

  return (
    product && (
      <>
        <section className="">
          <div className="sm:flex max-sm:space-y-6">
            <div className="w-full sm:w-[55%]">
              <div className="max-sm:w-[95%] mx-auto">
                <CustomPaging
                  imageUrls={[
                    metalImages.primary,
                    metalImages.secondary,
                    ...metalImages.others,
                  ]}
                />
              </div>
            </div>
            <div className="sm:pl-8 lg:pl-12 w-full sm:w-[45%]">
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
                      key={item.type}
                      buttonType="rounded"
                      className={
                        item.type === metal
                          ? "bg-black text-white hover:text-white cursor-default"
                          : ""
                      }
                      onClick={() => {
                        setMetal(item.type);
                        setSearchParams(`metal=${item.type}`);
                      }}
                    >
                      {metalTypes[item.type]}
                    </ButtonTag>
                  ))}
                </div>
              </div>
              <div className="my-4">
                <p
                  className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-text-secondary"
                  role="status"
                >
                  <StockIcon
                    className={
                      status === "inStock"
                        ? "fill-[rgb(62,214,96)]"
                        : status === "lowStock"
                        ? "fill-[rgb(241,146,38)]"
                        : "fill-[rgb(18,18,18)]"
                    }
                  />
                  {statusTypes[status]}
                </p>
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
                  key: metalTypes[item.type],
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

export default ProductDetails;
