import ButtonTag from "./CustomTags/ButtonTag";
import AnchorTag from "./CustomTags/AnchorTag";
import { TrashIcon } from "./SVG";
import { metalTypes } from "../constants";
import QuantityInput from "./QuantityInput";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <li className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-primary/15 flex items-center">
      <div className="w-24">
        <AnchorTag href={`/products/${item._id}?metal=${item.metal}`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="border border-border-primary/15"
          />
        </AnchorTag>
      </div>
      <div className="text-left pl-5 w-full relative">
        <ButtonTag
          buttonType="icon"
          onClick={() => {
            dispatch(removeFromCart(item._id));
          }}
          className="absolute top-0 right-0"
        >
          <TrashIcon width={16} height={16} />
        </ButtonTag>
        <AnchorTag
          href={`/products/${item._id}?metal=${item.metal}`}
          className="font-SofiaBold leading-5 text-text-primary"
        >
          {item.name}
        </AnchorTag>
        <div className="leading-3 text-xs">{metalTypes[item.metal]}</div>
        <div className="flex justify-between w-full items-center">
          <div className="my-3 text-left">
            <QuantityInput itemId={item._id} />
          </div>
          <div className="mt-2 text-right text-xs leading-4">
            {item.salePrice ? (
              <>
                <span className="text-text-secondary line-through mr-2">
                  ${item.price}.00
                </span>
                <span className="">${item.salePrice}.00</span>
              </>
            ) : (
              <span> ${item.price}.00</span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
