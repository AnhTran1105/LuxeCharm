import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { sortingTypes } from "../constants";

function SortDropdown({ items, selectedItem, setSelectedItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none capitalize"
          >
            this
            {/* {sortingTypes[selectedItem]} */}
          </MenuButton>
          {open && (
            <MenuItems
              static
              className="absolute z-10 mt-2 w-[240px] border border-border-tertiary bg-white shadow-lg"
            >
              <ul role="list" className="py-[5px] px-5">
                {items.map((item) => (
                  <MenuItem key={item}>
                    <div
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center cursor-pointer py-[10px] pr-5 relative"
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
