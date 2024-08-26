import { useEffect, useState } from "react";

function QuantityWidget({ onChangeValue }) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    onChangeValue(value);
  }, [onChangeValue, value]);

  return (
    <div className="flex border-border border">
      <button
        disabled={value === 1}
        onClick={() => setValue((prev) => prev - 1)}
        className={`h-6 w-9 text-center leading-6 flex items-center justify-center ${
          value === 1 ? "opacity-30" : "hover:bg-hoverMini"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 48 48"
          id="minus"
        >
          <path d="M38 26H10v-4h28v4z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
      </button>
      <span className="border-x border-border text-center leading-6 h-6 w-9 block text-xs">
        {value}
      </span>
      <button
        onClick={() => setValue((prev) => prev + 1)}
        className="h-6 w-9 text-center leading-6 flex items-center justify-center hover:bg-hoverMini"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="16"
          id="plus"
          className="scale-[135%]"
        >
          <path fillRule="evenodd" d="M4 7V4H3v3H0v1h3v3h1V8h3V7H4z"></path>
        </svg>
      </button>
    </div>
  );
}

export default QuantityWidget;
