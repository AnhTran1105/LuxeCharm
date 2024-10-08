import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { categoryTypes, metalTypes } from "../constants";
import { CaretIcon } from "./SVG";

function FilterDropdown({ title, items, selectedItems, setSelectedItems }) {
  const handleCategoryChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleReset = () => {
    setSelectedItems([]);
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <PopoverButton className="focus:outline-none capitalize flex gap-3 items-center hover:text-text-primary group">
            {title}
            <CaretIcon
              width={10}
              height={10}
              className={open ? "rotate-180" : ""}
            />
          </PopoverButton>
          {open && (
            <PopoverPanel
              static
              transition
              className="absolute z-10 mt-2 w-60 border border-border-tertiary bg-white shadow-sm origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <div className="border-b border-border-tertiary py-3 px-5 flex justify-between items-center">
                <span>{selectedItems.length} selected</span>
                <button className="link" role="button" onClick={handleReset}>
                  Reset
                </button>
              </div>
              <div className="py-[5px] px-5">
                {items.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleCategoryChange(item)}
                    className="flex items-center cursor-pointer py-[10px] pr-5 relative"
                  >
                    <svg
                      width="16"
                      className="mr-4"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <rect
                        width="16"
                        height="16"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="1"
                      ></rect>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      id="check"
                      className={`${
                        selectedItems.includes(item) ? "visible" : "invisible"
                      } fill-text-secondary absolute`}
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg>
                    {title === "category"
                      ? categoryTypes[item]
                      : metalTypes[item]}
                  </div>
                ))}
              </div>
            </PopoverPanel>
          )}
        </>
      )}
    </Popover>
  );
}

export default FilterDropdown;
