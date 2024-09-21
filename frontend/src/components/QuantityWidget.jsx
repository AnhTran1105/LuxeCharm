import ButtonTag from "./CustomTags/ButtonTag";
import { MinusIcon, PlusIcon } from "./SVG";

function QuantityWidget({ quantity, setQuantity }) {
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
  return (
    <div className="border border-primary w-fit flex justify-center items-center">
      <ButtonTag buttonType="icon" onClick={handleDecrease} className="p-4">
        <MinusIcon width={12} height={12} />
      </ButtonTag>
      <input
        className="w-14 text-center"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={1}
      />
      <ButtonTag buttonType="icon" onClick={handleIncrease} className="p-4">
        <PlusIcon width={12} height={12} />
      </ButtonTag>
    </div>
  );
}

export default QuantityWidget;
