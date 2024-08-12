import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

function FilterMenu({ children, items, onToggleVisibility }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  onToggleVisibility(toggleVisibility);

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
              <span>0 selected</span>
              <a href="/collections/jewelry" className="link" role="button">
                Reset
              </a>
            </div>
            <ul role="list" className="py-[5px] px-5">
              {items.map((item, index) => (
                <li
                  key={index}
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
                      fill="none"
                      strokeWidth="1"
                    ></rect>
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
