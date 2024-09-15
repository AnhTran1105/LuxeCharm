import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

function SortMenu({ items, setSortingType, sortingType }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Tippy
        onClickOutside={() => setIsVisible(false)}
        interactive
        placement="bottom-start"
        offset={[0, 0]}
        visible={isVisible}
        render={() => (
          <div className="border border-border-tertiary bg-white">
            <ul role="list" className="px-5 py-[10px]">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSortingType(item);
                    setIsVisible(!isVisible);
                  }}
                  className="flex items-center cursor-pointer py-[10px] pr-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    id="check"
                    className={`${
                      sortingType === item ? "visible" : "invisible"
                    } fill-text-secondary`}
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>

                  <span className="ml-3">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      >
        <div
          onClick={() => setIsVisible(!isVisible)}
          className="mr-[35px] flex justify-between items-center group cursor-pointer"
        >
          <span className="mr-2">{sortingType}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 22 13"
            width={10}
            height={10}
            className={isVisible ? "rotate-180" : ""}
          >
            <polyline
              points="21.557 1.222 11 11.778 0.443 1.222"
              fill="none"
              stroke="#121212"
              strokeMiterlimit="10"
            ></polyline>
          </svg>
        </div>
      </Tippy>
    </div>
  );
}

export default SortMenu;
