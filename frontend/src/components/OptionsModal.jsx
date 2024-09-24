import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import { StripeIcon, StockIcon, CloseIcon } from "./SVG";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { closeOptionsModal } from "../redux/optionsModal/optionsModalSlice";
import { handleAddToCart } from "../redux/cart/cartSlice";
import { metalTypes, statusTypes } from "../constants";
import { Rating } from "react-simple-star-rating";
import AnchorTag from "./CustomTags/AnchorTag";
import QuantityWidget from "./QuantityWidget";

function OptionsModal() {
  const { isOpened, productId, metalVariant } = useSelector(
    (state) => state.optionsModal
  );
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedMetalVariant, setSelectedMetalVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);

  useEffect(() => {
    if (metalVariant) {
      setSelectedMetalVariant(metalVariant);
    }
  }, [metalVariant]);

  useEffect(() => {
    if (productId) {
      (async () => {
        try {
          const response = await axios.get(`/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      })();
    }
  }, [productId]);

  useEffect(() => {
    if (selectedMetalVariant && items) {
      const cartItemQuantity =
        items.find((item) => item.metalVariantId === selectedMetalVariant._id)
          ?.quantity || 0;

      setMaxQuantity(selectedMetalVariant.quantity - cartItemQuantity);
    }
  }, [selectedMetalVariant, items]);

  return (
    isOpened &&
    product &&
    selectedMetalVariant && (
      <Dialog
        open={isOpened}
        onClose={() => dispatch(closeOptionsModal())}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70 duration-100 ease-out data-[closed]:opacity-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full h-full sm:w-11/12 lg:w-5/6 xl:w-4/5 sm:h-1/2 md:h-3/5 lg:h-2/3 xl:h-3/4 2xl:h-5/6 overflow-y-scroll bg-white p-7 duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-center uppercase font-SofiaBold text-sm leading-[30px] relative">
              <ButtonTag
                buttonType="icon"
                onClick={() => dispatch(closeOptionsModal())}
                className="absolute -top-7 -right-7 md:-top-5 md:-right-5 p-1 group"
              >
                <CloseIcon width={20} height={20} />
              </ButtonTag>
            </DialogTitle>
            <div className="sm:flex max-sm:space-y-6">
              <div className="w-full sm:w-[55%]">
                <div className="flex justify-center">
                  <img
                    src={metalVariant.images.primary}
                    className="w-full md:w-4/5 xl:w-3/4 aspect-[3/4]"
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
                    initialValue={
                      Math.round(product.rating.avgRating * 10) / 10
                    }
                    fillColor="#a16854"
                    SVGclassName={`inline-block`}
                    readonly={true}
                    allowFraction={true}
                  />
                  <div className="mt-1 text-sm text-text-secondary">
                    {product.rating.count}{" "}
                    {product.rating.count > 1 ? "Reviews" : "Review"}
                  </div>
                </div>
                {product.salePrice ? (
                  <div className="my-4 flex items-center">
                    <span className="text-text-secondary line-through mr-4">
                      ${product.price}.00
                    </span>
                    <span className="mr-2 text-lg">
                      ${product.salePrice}.00
                    </span>
                    <span className="bg-primary w-fit px-3 py-1 rounded-full text-xs text-white">
                      Sale
                    </span>
                  </div>
                ) : (
                  <div className="my-4">${product.price}.00</div>
                )}
                <div className="my-4">
                  <p className="text-sm text-text-primary mb-3">Metal</p>
                  <div className="flex gap-2">
                    {product.metalVariants.map((variant) => (
                      <ButtonTag
                        key={variant._id}
                        buttonType="rounded"
                        className={
                          variant.metalType === selectedMetalVariant.metalType
                            ? "bg-black text-white hover:text-white cursor-default"
                            : ""
                        }
                        onClick={() => {
                          setSelectedMetalVariant(variant);
                        }}
                      >
                        {metalTypes[variant.metalType]}
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
                        selectedMetalVariant.status === "inStock"
                          ? "fill-[rgb(62,214,96)]"
                          : selectedMetalVariant.status === "lowStock"
                          ? "fill-[rgb(241,146,38)]"
                          : "fill-[rgb(18,18,18)]"
                      }
                    />
                    {statusTypes[selectedMetalVariant.status]}
                  </p>
                </div>
                <div className="my-4">
                  <p className="text-sm text-text-primary mb-3">Quantity</p>
                  <QuantityWidget
                    quantity={quantity}
                    setQuantity={setQuantity}
                    maxQuantity={maxQuantity}
                  />
                </div>
                <div className="my-4 space-y-4 max-w-[440px]">
                  <ButtonTag
                    onClick={() =>
                      dispatch(
                        handleAddToCart({
                          productId: product._id,
                          quantity: quantity,
                          metalVariantId: selectedMetalVariant._id,
                          priceAtPurchase: product.price,
                          salePriceAtPurchase: product.salePrice,
                        })
                      )
                    }
                  >
                    Add to cart
                  </ButtonTag>
                  <ButtonTag
                    onClick={() => (window.location.href = "/checkout-stripe")}
                    className="bg-[#646fde] border-none text-white flex justify-center items-center gap-2 hover:bg-[#5762c1] py-0"
                  >
                    Buy with
                    <StripeIcon width={45.5} height={45.5} />
                  </ButtonTag>
                </div>
                <div className="my-4">
                  <AnchorTag
                    href={`/products/${product._id}?variant=${selectedMetalVariant._id}`}
                    className="gap-3 items-center flex"
                  >
                    View full details
                    <svg
                      viewBox="0 0 14 10"
                      fill="none"
                      className="ml-1"
                      aria-hidden="true"
                      width={12}
                      height={12}
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </AnchorTag>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
  );
}

export default OptionsModal;
