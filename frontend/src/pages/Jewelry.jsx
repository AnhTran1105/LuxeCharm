import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import AnchorTag from "../components/CustomTags/AnchorTag";
import { useParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";

const categories = ["bracelets", "charms", "earrings", "necklaces", "rings"];
const metals = ["gold", "goldVermeil", "silver", "sterlingSilver"];
const sortingTypes = [
  "rating_desc",
  "alphabetical_asc",
  "alphabetical_desc",
  "price_asc",
  "price_desc",
  "date_asc",
  "date_desc",
];

function Jewelry() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedSortingType, setSelectedSortingType] = useState("rating_desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/products", {
          params: {
            categories: selectedCategories.join(","),
            metals: selectedMetals.join(","),
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
          },
        });
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [selectedCategories, selectedMetals, minPrice, maxPrice]);

  return (
    products && (
      <div className="mx-auto my-0 flex flex-col items-center justify-center">
        <div className="lg:max-w-[780px] md:max-w-[500px] text-center">
          <h1 className="text-[40px]">
            {category[0].toUpperCase() + category.slice(1)}
          </h1>
          <div className="my-6">
            <p className="text-text-secondary tracking-[0.6px] leading-7">
              Create a look that's all your own with our affordable, everyday
              jewelry. For a full layered look, stack our{" "}
              <AnchorTag
                type="underline"
                href="/collections/silver"
                className="text-base text-text-primary"
              >
                silver
              </AnchorTag>{" "}
              and gold{" "}
              <AnchorTag
                type="underline"
                href="/collections/necklaces"
                className="text-base text-text-primary"
              >
                necklaces
              </AnchorTag>{" "}
              or shop our{" "}
              <AnchorTag
                type="underline"
                href="/collections/prestack-necklaces"
                className="text-base text-text-primary"
              >
                prestack-necklaces
              </AnchorTag>
              . We also have everything you need for a killer ear stack —{" "}
              <AnchorTag
                type="underline"
                href="/collections/simple"
                className="text-base text-text-primary"
              >
                simple
              </AnchorTag>{" "}
              and{" "}
              <AnchorTag
                type="underline"
                href="/collections/statement"
                className="text-base text-text-primary"
              >
                statement
              </AnchorTag>
              <AnchorTag
                type="underline"
                href="/collections/earrings"
                className="text-base text-text-primary"
              >
                &nbsp;earrings
              </AnchorTag>
              . If you need an arm candy look, simply stack up our{" "}
              <AnchorTag
                type="underline"
                href="/collections/rings"
                className="text-base text-text-primary"
              >
                rings
              </AnchorTag>{" "}
              and{" "}
              <AnchorTag
                type="underline"
                href="/collections/bracelets"
                className="text-base text-text-primary"
              >
                bracelets
              </AnchorTag>
              .
            </p>
          </div>
        </div>
        <div className="pt-[10px] w-full text-text-secondary text-sm">
          <div className="w-full mb-5 flex justify-between">
            <div className="flex justify-center items-center gap-5">
              <h2 className="">Filter:</h2>
              <FilterDropdown
                items={categories}
                title="category"
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
              />
              <FilterDropdown
                items={metals}
                title="metal"
                selectedItems={selectedMetals}
                setSelectedItems={setSelectedMetals}
              />
            </div>
            <div className="flex justify-center items-center">
              <h2 className="mr-5">Sort by:</h2>
              <SortDropdown
                items={sortingTypes}
                selectedSortingType={selectedSortingType}
                setSelectedSortingType={setSelectedSortingType}
              />
              <h2 className="mr-5">{0} products</h2>
            </div>
          </div>
          {/* <div className="flex gap-4 items-center">
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
          </div> */}
        </div>
        <ProductList products={products} />
        <nav className="mt-[50px]">
          <ul role="list" className="flex justify-center items-center">
            <li className="max-w-[44px] mr-[10px] group">
              <a
                href="/collections/jewelry?page=11"
                className="pagination-item arrow group"
              >
                <svg
                  className="h-[6px] rotate-90 group-hover:scale-125"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 22 13"
                >
                  <polyline
                    points="21.557 1.222 11 11.778 0.443 1.222"
                    fill="none"
                    stroke="#121212"
                    strokeMiterlimit="10"
                  ></polyline>
                </svg>
              </a>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <a
                href="/collections/jewelry?page=1"
                className="pagination-item active-page"
              >
                1
              </a>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <a href="/collections/jewelry?page=2" className="pagination-item">
                2
              </a>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <a href="/collections/jewelry?page=3" className="pagination-item">
                3
              </a>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <span className="pagination-item">…</span>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <a
                href="/collections/jewelry?page=11"
                className="pagination-item"
              >
                11
              </a>
            </li>
            <li className="max-w-[44px] mr-[10px] group">
              <a
                href="/collections/jewelry?page=11"
                className="pagination-item arrow group"
              >
                <svg
                  className="h-[6px] -rotate-90 group-hover:scale-125"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 22 13"
                >
                  <polyline
                    points="21.557 1.222 11 11.778 0.443 1.222"
                    fill="none"
                    stroke="#121212"
                    strokeMiterlimit="10"
                  ></polyline>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
}

export default Jewelry;
