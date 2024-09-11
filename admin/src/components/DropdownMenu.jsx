import Tippy from "@tippyjs/react/headless";
import { useState, useRef, useEffect } from "react";

function DropdownMenu({
  title,
  options,
  defaultOption,
  onValueChange,
  value: propValue,
}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(propValue || "");
  const defaultOptionRef = useRef();

  const handleItemClick = (item) => {
    setValue(item);
    setVisible(false);
    onValueChange(item);
  };

  useEffect(() => {
    if (propValue !== undefined && propValue !== value) {
      setValue(propValue);
    }
  }, [propValue, value]);

  return (
    <div>
      <Tippy
        visible={visible}
        onClickOutside={() => setVisible(false)}
        interactive
        placement="bottom-start"
        offset={[0, 0]}
        render={() => (
          <ul className="field dropdown flex-col bg-white" role="list">
            {options.map((item, index) => (
              <li
                style={{ width: `${defaultOptionRef.current?.offsetWidth}px` }}
                onClick={() => handleItemClick(item)}
                className={`flex items-center cursor-pointer py-[10px] px-[15px] pr-5 text-base ${
                  value === item &&
                  "bg-background text-color-foreground cursor-not-allowed"
                } hover:bg-background hover:text-color-foreground`}
                key={index}
              >
                {title + ": " + item}
              </li>
            ))}
          </ul>
        )}
      >
        <div
          className="cursor-pointer field"
          onClick={() => {
            setVisible(!visible);
          }}
          ref={defaultOptionRef}
        >
          <div className="flex justify-between items-center p-[15px] default-option w-full h-[47px]">
            <span className="text-base">
              {value ? (
                <span className="text-color-foreground">
                  {title + ": " + value}
                </span>
              ) : (
                <span>{defaultOption + "*"}</span>
              )}
            </span>
            <svg
              className={`${visible && "rotate-180"}`}
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 22 13"
              width={16}
              height={16}
            >
              <polyline
                points="21.557 1.222 11 11.778 0.443 1.222"
                fill="none"
                stroke="#121212"
                strokeMiterlimit="10"
              ></polyline>
            </svg>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default DropdownMenu;
