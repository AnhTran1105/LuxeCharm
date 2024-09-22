import ButtonTag from "./CustomTags/ButtonTag";
import { MinusIcon, PlusIcon } from "./SVG";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity } from "../redux/cart/cartSlice";
import { useEffect, useState } from "react";

function QuantityInput({ metalVariantId, maxQuantity }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const item = items.find((item) => item.metalVariantId === metalVariantId);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
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
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  };

  useEffect(() => {
    if (1 <= quantity && quantity <= maxQuantity) {
      dispatch(updateCartItemQuantity({ metalVariantId, quantity }));
    }
  }, [quantity, dispatch, metalVariantId, maxQuantity]);

  return (
    <div className="border border-border-secondary w-fit flex justify-center items-center">
      <ButtonTag
        buttonType="icon"
        onClick={handleDecrease}
        disabled={quantity === 1}
        className="p-3"
      >
        <MinusIcon width={10} height={10} />
      </ButtonTag>
      <input
        className="w-8 text-center text-xs"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={1}
        max={maxQuantity}
      />
      <ButtonTag
        buttonType="icon"
        onClick={handleIncrease}
        className="p-3"
        disabled={quantity === maxQuantity}
      >
        <PlusIcon width={10} height={10} />
      </ButtonTag>
    </div>
  );
}

export default QuantityInput;
