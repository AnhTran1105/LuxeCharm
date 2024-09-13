import FilterMenu from "./FilterMenu";
import { useRef, useState, useEffect, useCallback } from "react";

function Filter({ onFilterChange }) {
  const toggleMenuVisibility = useRef([]);
  const [filters, setFilters] = useState({
    category: [],
    availability: [],
    metal: [],
    material: [],
    price: [],
  });

  const handleButtonClick = (index) => {
    if (toggleMenuVisibility.current[index]) {
      toggleMenuVisibility.current[index]();
    }
  };

  const handleFilterChange = useCallback((filterType, selectedItems) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedItems,
    }));
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="pt-[10px] flex w-full text-foreground75 text-sm">
      <div className="mb-5 w-full flex justify-between">
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
          <h2 className="mr-5">524 products</h2>
        </div>
      </div>
    </div>
  );
}

export default Filter;
