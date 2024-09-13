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
          <div className="border border-color-foreground/10 bg-white w-[350px]">
            <div className="border-b border-color-foreground/20 py-[15px] px-5 flex justify-between items-center">
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
                  className="flex items-center cursor-pointer py-[10px] pr-5"
                >
                  <svg
                    className="mr-4"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect
                      width="16"
                      height="16"
                      stroke="currentColor"
                      fill={
                        selectedItems.includes(item.name)
                          ? "currentColor"
                          : "none"
                      }
                      strokeWidth="1"
                    ></rect>
                    {selectedItems.includes(item.name) && (
                      <path
                        d="M4 8l3 3 5-5"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                  </svg>
                  <span aria-hidden="true capitalize">
                    {item.name} ({item.quantity})
                  </span>
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
