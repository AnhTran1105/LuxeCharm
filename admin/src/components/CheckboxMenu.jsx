import { useEffect } from "react";
import { useState } from "react";

function CheckboxMenu({ options, onValueChange }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleItemClick = (option) => {
    if (!selectedValues.some((value) => value.metal === option)) {
      setSelectedValues([...selectedValues, { metal: option, quantity: 0 }]);
    } else {
      const arr = selectedValues.filter((value) => value.metal !== option);
      setSelectedValues(arr);
    }
  };

  const handleQuantityChange = (option, quantity) => {
    setSelectedValues((prevValues) =>
      prevValues.map((value) =>
        value.metal === option ? { ...value, quantity } : value
      )
    );
  };

  useEffect(() => {
    onValueChange(selectedValues);
  }, [selectedValues, onValueChange]);

  return (
    <ul className="grid gap-5" role="list">
      {options.map((option, index) => (
        <div
          key={index}
          className="grid items-center grid-cols-3 h-[47px] pl-[15px] border cursor-pointer hover-border hover:border-no-color "
        >
          <li
            className="flex items-center col-span-2 h-[45px] border-r"
            onClick={() => handleItemClick(option)}
          >
            <i className="relative block mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                enableBackground="new 0 0 512 512"
                viewBox="0 0 512 512"
                id="square"
              >
                <path
                  d="M486.468,491.821H26.47c-3.977,0-7.202-3.224-7.202-7.201V28.317c0-3.978,3.225-7.201,7.202-7.201h459.998
    				c3.978,0,7.201,3.224,7.201,7.201V484.62C493.669,488.598,490.445,491.821,486.468,491.821z M33.671,477.419h445.595v-441.9
    				H33.671V477.419z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={`absolute fill-color-foreground top-0 left-0 ${
                  selectedValues.some((value) => value.metal === option)
                    ? "opacity-100"
                    : "opacity-0"
                } transition-opacity duration-100 ease-linear`}
                id="check"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
              </svg>
            </i>
            <span
              className={`text-base ${
                selectedValues.some((value) => value.metal === option)
                  ? "text-color-foreground"
                  : "text-foreground75"
              }`}
            >
              {option}
            </span>
          </li>
          <div className="field !mt-0 before:content-none after:content-none">
            <input
              id="quantity"
              autoComplete="quantity"
              required
              autoCapitalize="off"
              placeholder="quantity"
              autoCorrect="off"
              min={0}
              type="number"
              value={
                selectedValues.find((value) => value.metal === option)
                  ?.quantity || 0
              }
              onChange={(e) => handleQuantityChange(option, e.target.value)}
              className="appearance-none p-[15px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground !shadow-none"
              disabled={!selectedValues.some((value) => value.metal === option)}
            />
            <label htmlFor="quantity">Quantity*</label>
          </div>
        </div>
      ))}
    </ul>
  );
}

export default CheckboxMenu;
