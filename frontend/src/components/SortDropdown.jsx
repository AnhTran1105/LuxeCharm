import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { sortingTypes } from "../constants";
import { CaretIcon } from "./SVG";

function SortDropdown({ items, selectedItem, setSelectedItem }) {
  return (
    <Menu>
      {({ open, close }) => (
        <>
          <MenuButton className="focus:outline-none flex items-center gap-4 hover:text-text-primary">
            {sortingTypes[selectedItem]}
            <CaretIcon
              width={10}
              height={10}
              className={open ? "rotate-180" : ""}
            />
          </MenuButton>
          {open && (
            <MenuItems
              anchor="bottom start"
              transition
              className="absolute z-10 py-2 border border-border-tertiary bg-white shadow-sm text-sm origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <ul role="list" className="">
                {items.map((item) => (
                  <MenuItem key={item}>
                    <div
                      onClick={() => {
                        setSelectedItem(item);
                        close();
                      }}
                      className={`flex items-center cursor-pointer px-6 py-2 relative ${
                        selectedItem === item
                          ? "text-white bg-background-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                      }`}
                    >
                      {sortingTypes[item]}
                    </div>
                  </MenuItem>
                ))}
              </ul>
            </MenuItems>
          )}
        </>
      )}
    </Menu>
  );
}

export default SortDropdown;
