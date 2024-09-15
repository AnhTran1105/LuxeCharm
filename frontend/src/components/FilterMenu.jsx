import Tippy from "@tippyjs/react/headless";
import { useState, useEffect } from "react";

function FilterMenu({
  children,
  items,
  onToggleVisibility,
  onFilterChange,
  filterType,
  initialSelectedItems = [],
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
  }, [initialSelectedItems]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    onToggleVisibility(toggleVisibility);
  }, [onToggleVisibility]);

  useEffect(() => {
    onFilterChange(filterType, selectedItems);
  }, [selectedItems, filterType, onFilterChange]);

  const handleItemClick = (item) => {
    setSelectedItems((prev) => {
      const newSelection = prev.includes(item.name)
        ? prev.filter((i) => i !== item.name)
        : [...prev, item.name];
      return newSelection;
    });
  };

  const resetSelection = () => {
    setSelectedItems([]);
  };

  return (
    <div>
      <Tippy
        onClickOutside={() => setIsVisible(false)}
        interactive
        placement="bottom-start"
        offset={[0, 0]}
        visible={isVisible}
        render={() => (
          <div className="border border-border-tertiary bg-white w-[240px]">
            <div className="border-b border-border-tertiary py-[15px] px-5 flex justify-between items-center">
              <span>{selectedItems.length} selected</span>
              <button onClick={resetSelection} className="link" role="button">
                Reset
              </button>
            </div>
            <ul role="list" className="py-[5px] px-5">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
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
                      selectedItems.includes(item.name)
                        ? "visible"
                        : "invisible"
                    } fill-text-secondary absolute`}
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>
                  <span aria-hidden="true capitalize">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default FilterMenu;
