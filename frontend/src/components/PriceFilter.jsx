import Tippy from "@tippyjs/react/headless";
import { useState, useEffect } from "react";

function PriceFilter({
  maxPrice,
  children,
  onToggleVisibility,
  onFilterChange,
  filterType,
  initialPriceRange = { from: null, to: null },
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    onToggleVisibility(toggleVisibility);
  }, [onToggleVisibility]);

  useEffect(() => {
    onFilterChange(filterType, priceRange);
  }, [priceRange, filterType, onFilterChange]);

  const handleFromChange = (e) => {
    const newFrom = e.target.value === "" ? null : Number(e.target.value);
    setPriceRange((prev) => ({ ...prev, from: newFrom }));
  };

  const handleToChange = (e) => {
    const newTo = e.target.value === "" ? null : Number(e.target.value);
    setPriceRange((prev) => ({ ...prev, to: newTo }));
  };

  const resetPriceRange = () => {
    setPriceRange({ from: null, to: null });
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
              <span>The highest price is ${maxPrice}.00</span>
              <button onClick={resetPriceRange} className="link" role="button">
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
                    max={maxPrice}
                    value={priceRange.from === null ? "" : priceRange.from}
                    onChange={handleFromChange}
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
                    max={maxPrice}
                    value={priceRange.to === null ? "" : priceRange.to}
                    onChange={handleToChange}
                    autoCapitalize="off"
                    placeholder="To"
                    autoCorrect="off"
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                  />
                  <label htmlFor="password">To</label>
                </div>
              </div>
            </div>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default PriceFilter;
