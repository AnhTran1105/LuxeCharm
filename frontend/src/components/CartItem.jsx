import ButtonTag from "./CustomTags/ButtonTag";
import AnchorTag from "./CustomTags/AnchorTag";
import { TrashIcon } from "./SVG";
import { metalTypes } from "../constants";
import QuantityInput from "./QuantityInput";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cart/cartSlice";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/products/${item.productId}`);
      setProduct({
        ...response.data,
        metalVariant: response.data.metalVariants.find(
          (variant) => variant._id === item.metalVariantId
        ),
      });
    })();
  }, [item]);

  return (
    product && (
      <li className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-primary/15 flex items-center">
        <div className="w-24">
          <AnchorTag
            href={`/products/${product._id}?variant=${item.metalVariantId}`}
          >
            <img
              src={product.metalVariant.images.primary}
              alt={product.name}
              className="border border-border-primary/15"
            />
          </AnchorTag>
        </div>
        <div className="text-left pl-5 w-full relative">
          <ButtonTag
            buttonType="icon"
            onClick={() => {
              dispatch(removeFromCart(item.metalVariantId));
            }}
            className="absolute top-0 right-0"
          >
            <TrashIcon width={16} height={16} />
          </ButtonTag>
          <AnchorTag
            href={`/products/${product._id}?variant=${item.metalVariantId}`}
            className="font-SofiaBold leading-5 text-text-primary"
          >
            {product.name}
          </AnchorTag>
          <div className="leading-3 text-xs">
            {metalTypes[product.metalVariant.metalType]}
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="my-3 text-left">
              <QuantityInput
                metalVariantId={item.metalVariantId}
                maxQuantity={product.metalVariant.quantity}
              />
            </div>
            <div className="mt-2 text-right text-xs leading-4">
              {item.salePriceAtPurchase ? (
                <>
                  <span className="text-text-secondary line-through mr-2">
                    ${item.priceAtPurchase}.00
                  </span>
                  <span className="">${item.salePriceAtPurchase}.00</span>
                </>
              ) : (
                <span> ${item.priceAtPurchases}.00</span>
              )}
            </div>
          </div>
        </div>
      </li>
    )
  );
}

export default CartItem;
