import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CaretIcon } from "./SVG";

function PriceDropdown({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  highestPrice,
}) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <PopoverButton className="focus:outline-none capitalize flex gap-3 items-center hover:text-text-primary group">
            Price
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
              className="absolute z-10 mt-2 w-80 border border-border-tertiary bg-white shadow-sm origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <div className="border-b border-border-tertiary py-3 px-5 flex justify-between items-center">
                <div className="">The highest price is ${highestPrice}.00</div>
                <button
                  className="link"
                  role="button"
                  onClick={() => {
                    setMinPrice(null);
                    setMaxPrice(null);
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span>$</span>
                  <div className="field">
                    <input
                      id="from"
                      type="number"
                      min={0}
                      max={highestPrice}
                      value={minPrice === null ? "" : minPrice}
                      onChange={(e) =>
                        setMinPrice(
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                      autoCapitalize="off"
                      placeholder="From"
                      autoCorrect="off"
                      className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                    />
                    <label htmlFor="password">From</label>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span>$</span>
                  <div className="field">
                    <input
                      id="to"
                      type="number"
                      min={0}
                      max={highestPrice}
                      value={maxPrice === null ? "" : maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                      autoCapitalize="off"
                      placeholder="To"
                      autoCorrect="off"
                      className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-secondary"
                    />
                    <label htmlFor="password">To</label>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          )}
        </>
      )}
    </Popover>
  );
}

export default PriceDropdown;
