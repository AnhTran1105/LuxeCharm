import FilterMenu from "./FilterMenu";
import { useRef, useState, useEffect, useCallback } from "react";
import PriceFilter from "./PriceFilter";

function Filter({ onFilterChange, filteredProductQuantity, maxPrice }) {
  const toggleMenuVisibility = useRef([]);
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    metal: [],
    material: [],
    price: { from: null, to: null },
  });

  const handleButtonClick = (index) => {
    if (toggleMenuVisibility.current[index]) {
      toggleMenuVisibility.current[index]();
    }
  };

  const handleFilterChange = useCallback((filterType, selectedItems) => {
    setFilters((prevFilters) => {
      if (filterType === "price") {
        return {
          ...prevFilters,
          price: selectedItems,
        };
      }

      return {
        ...prevFilters,
        [filterType]: selectedItems,
      };
    });
  }, []);

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
      availability: [],
      metal: [],
      material: [],
      price: {
        from: null,
        to: null,
      },
    });
  };

  return (
    <div className="pt-[10px] w-full text-foreground75 text-sm">
      <div className="w-full mb-5 flex justify-between">
        <div className="flex justify-center items-center">
          <h2 className="mr-5">Filter:</h2>
          <FilterMenu
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
              <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
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
          </FilterMenu>
          <FilterMenu
            onFilterChange={handleFilterChange}
            initialSelectedItems={filters.availability}
            filterType="availability"
            onToggleVisibility={(toggleFn) =>
              (toggleMenuVisibility.current[1] = toggleFn)
            }
            items={[
              {
                name: "In stock",
                quantity: 1,
              },
              {
                name: "Out of stock",
                quantity: 1,
              },
            ]}
          >
            <div
              onClick={() => handleButtonClick(1)}
              className="mr-[35px] flex justify-center items-center group cursor-pointer"
            >
              <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
                Availability
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
          </FilterMenu>
          <FilterMenu
            onFilterChange={handleFilterChange}
            initialSelectedItems={filters.metal}
            filterType="metal"
            onToggleVisibility={(toggleFn) =>
              (toggleMenuVisibility.current[2] = toggleFn)
            }
            items={[
              {
                name: "Gold",
                quantity: 1,
              },
              {
                name: "Gold Vermeil",
                quantity: 1,
              },
              {
                name: "Mixed Metal",
                quantity: 1,
              },
              {
                name: "Rose Gold",
                quantity: 1,
              },
              {
                name: "Silver",
                quantity: 1,
              },
              {
                name: "Sterling Silver",
                quantity: 1,
              },
            ]}
          >
            <div
              onClick={() => handleButtonClick(2)}
              className="mr-[35px] flex justify-center items-center group cursor-pointer"
            >
              <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
                Metal
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
          </FilterMenu>
          <FilterMenu
            onFilterChange={handleFilterChange}
            initialSelectedItems={filters.material}
            filterType="material"
            onToggleVisibility={(toggleFn) =>
              (toggleMenuVisibility.current[3] = toggleFn)
            }
            items={[
              {
                name: "Faux Leather",
                quantity: 1,
              },
              {
                name: "Resin",
                quantity: 1,
              },
            ]}
          >
            <div
              onClick={() => handleButtonClick(3)}
              className="mr-[35px] flex justify-center items-center group cursor-pointer"
            >
              <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
                Material
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
          </FilterMenu>
          <PriceFilter
            maxPrice={maxPrice}
            onFilterChange={handleFilterChange}
            initialPriceRange={{
              from: filters.price?.from || null,
              to: filters.price?.to || null,
            }}
            filterType="price"
            onToggleVisibility={(toggleFn) =>
              (toggleMenuVisibility.current[4] = toggleFn)
            }
          >
            <div
              onClick={() => handleButtonClick(4)}
              className="mr-[35px] flex justify-center items-center group cursor-pointer"
            >
              <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
                Price
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
          </PriceFilter>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="mr-5">Sort by:</h2>
          <div
            onClick={handleButtonClick}
            className="mr-[35px] w-[150px] flex justify-between items-center group cursor-pointer"
          >
            <span className="mr-2 group-hover:underline group-hover:underline-offset-3px group-hover:text-color-foreground">
              Featured
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
                      className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
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
                        className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
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
