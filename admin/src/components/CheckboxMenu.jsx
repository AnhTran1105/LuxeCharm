import { useState } from "react";

function CheckboxMenu({ options, onValueChange }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleItemClick = (option) => {
    if (!selectedValues.includes(option)) {
      setSelectedValues([...selectedValues, option]);
      onValueChange([...selectedValues, option]);
    } else {
      const arr = selectedValues.filter((value) => value !== option);
      setSelectedValues(arr);
      onValueChange(arr);
    }
  };

  return (
    <ul className="grid grid-cols-2 gap-5" role="list">
      {options.map((option, index) => (
        <li
          className="flex items-center h-[45px] px-[15px] border cursor-pointer hover-border hover:border-no-color"
          key={index}
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
                selectedValues.includes(option) ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100 ease-linear`}
              id="check"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
            </svg>
          </i>
          <span
            className={`text-base ${
              selectedValues.includes(option)
                ? "text-color-foreground"
                : "text-foreground75"
            }`}
          >
            {option}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default CheckboxMenu;
