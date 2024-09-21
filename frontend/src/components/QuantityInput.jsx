import ButtonTag from "./CustomTags/ButtonTag";
import { MinusIcon, PlusIcon } from "./SVG";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity } from "../redux/cart/cartSlice";

function QuantityInput({ itemId }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const item = items.find((item) => item._id === itemId);

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({ cartItemId: itemId, quantity: newQuantity })
      );
    }
  };

  return (
    <div className="border border-border-secondary w-fit flex justify-center items-center">
      <ButtonTag
        buttonType="icon"
        onClick={() => handleUpdateQuantity(item.quantity - 1)}
        disabled={item.quantity === 1}
        className="p-3"
      >
        <MinusIcon
          width={10}
          height={10}
          className={`${
            item.quantity === 1
              ? "opacity-30 group-hover:scale-100 group-hover:text-text-secondary"
              : ""
          }`}
        />
      </ButtonTag>
      <input
        className="w-8 text-center text-xs"
        type="number"
        value={item.quantity}
        onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
        min={1}
      />
      <ButtonTag
        buttonType="icon"
        onClick={() => handleUpdateQuantity(item.quantity + 1)}
        className="p-3"
      >
        <PlusIcon width={10} height={10} />
      </ButtonTag>
    </div>
  );
}

export default QuantityInput;
