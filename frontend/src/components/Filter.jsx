import { useState, useEffect } from "react";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./FilterDropdown";

function Filter({
  onFilterChange,
  filteredProductQuantity,
  maxPrice,
  setSortingType,
  sortingType,
}) {
  const [filters, setFilters] = useState({
    category: [],
    metal: [],
    price: { from: null, to: null },
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleRemoveSingleFilter = (filterType, item) => {
    setFilters((prevFilters) => {
      if (filterType === "price") {
        return {
          ...prevFilters,
          price: {
            from: null,
            to: null,
          },
        };
      }

      return {
        ...prevFilters,
        [filterType]: prevFilters[filterType].filter(
          (selectedItem) => selectedItem !== item
        ),
      };
    });
  };

  const handleRemoveAllFilters = () => {
    setFilters({
      category: [],
      metal: [],
      price: {
        from: null,
        to: null,
      },
    });
  };

  return (
    <div className="pt-[10px] w-full text-text-secondary text-sm">
      <div className="w-full mb-5 flex justify-between">
        <div className="flex justify-center items-center">
          <h2 className="mr-5">Filter:</h2>
          <FilterDropdown
            items={["bracelets", "charms", "earrings", "necklaces", "rings"]}
          />
          {/* <FilterMenu
            onFilterChange={handleFilterChange}
            initialSelectedItems={filters.category}
            filterType="category"
            onToggleVisibility={(toggleFn) =>
              (toggleMenuVisibility.current[0] = toggleFn)
            }
            items={[
              {
                name: "Anklets",
                quantity: 1,
              },
              {
                name: "Body Chains",
                quantity: 1,
              },
              {
                name: "Bracelets",
                quantity: 1,
              },
              {
                name: "Charms",
                quantity: 1,
              },
              {
                name: "Earrings",
                quantity: 1,
              },
              {
                name: "Gift Bundles",
                quantity: 1,
              },
              {
                name: "Mystery",
                quantity: 1,
              },
              {
                name: "Necklaces",
                quantity: 1,
              },
              {
                name: "Rings",
                quantity: 1,
              },
            ]}
          >
            <div
              onClick={() => handleButtonClick(0)}
              className="mr-[35px] flex justify-center items-center group cursor-pointer"
            >
              <span className="mr-2 group-hover:underline group-hover:underline-offset-2 group-hover:text-color-foreground">
                Category
              </span>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 22 13"
                className="w-[10px] h-[10px]"
              >
                <polyline
                  points="21.557 1.222 11 11.778 0.443 1.222"
                  fill="none"
                  stroke="#121212"
                  strokeMiterlimit="10"
                ></polyline>
              </svg>
            </div>
          </FilterMenu> */}
        </div>
        <div className="flex justify-center items-center">
          <h2 className="mr-5">Sort by:</h2>
          <SortDropdown
            items={[
              "Featured",
              "Alphabetically, A - Z",
              "Alphabetically, Z - A",
              "Price, low to high",
              "Price, high to low",
              "Date, old to new",
              "Date, new to old",
            ]}
            sortingType={sortingType}
            setSortingType={setSortingType}
          />
          <h2 className="mr-5">{filteredProductQuantity} products</h2>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ul role="list" className="flex gap-4">
          {Object.entries(filters).map(([key, value]) => {
            if (key === "price" && value.from !== null) {
              return (
                <li
                  key={key}
                  className="mb-5 border-[#ccc] border hover:border-color-foreground hover:cursor-pointer rounded-full px-2 py-1 flex gap-2 justify-center items-center"
                >
                  Price: ${value.from}.00 - $
                  {value.to !== null ? value.to : maxPrice}.00
                  <button
                    onClick={() => handleRemoveSingleFilter(key)}
                    className="group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 48 48"
                      className="fill-text-stext-text-secondary group-hover:fill-color-foreground group-hover:scale-105"
                      id="close"
                    >
                      <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </button>
                </li>
              );
            }

            return value.length > 0
              ? value.map((item, index) => (
                  <li
                    key={`${key}-${index}`}
                    className="mb-5 border-[#ccc] border hover:border-color-foreground hover:cursor-pointer rounded-full px-2 py-1 flex gap-2 justify-center items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {item}
                    <button
                      onClick={() => handleRemoveSingleFilter(key, item)}
                      className="group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 48 48"
                        className="fill-text-stext-text-secondary group-hover:fill-color-foreground group-hover:scale-105"
                        id="close"
                      >
                        <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </button>
                  </li>
                ))
              : null;
          })}
        </ul>
        {Object.values(filters).some((value) => value.length > 0) && (
          <button
            type="button"
            className="mb-5"
            onClick={handleRemoveAllFilters}
          >
            Remove all
          </button>
        )}
      </div>
    </div>
  );
}

export default Filter;
