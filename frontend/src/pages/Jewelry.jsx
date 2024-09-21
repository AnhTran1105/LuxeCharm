import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";
import PriceDropdown from "../components/PriceDropdown";
import { CloseIcon } from "../components/SVG";
import ButtonTag from "../components/CustomTags/ButtonTag";
import { categoryTypes, jewelryDescriptions, metalTypes } from "../constants";

const categories = ["bracelets", "charms", "earrings", "necklaces", "rings"];
const metals = ["gold", "goldVermeil", "silver", "sterlingSilver"];
const sortingTypes = [
  "soldCount_desc",
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
  const [productsInfo, setProductsInfo] = useState();

  const [selectedCategories, setSelectedCategories] = useState(
    category ? [category] : []
  );
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedSortingType, setSelectedSortingType] = useState(
    sortingTypes[0]
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/products/filtered", {
          params: {
            categories: selectedCategories.join(","),
            metals: selectedMetals.join(","),
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            sortBy: selectedSortingType,
          },
        });
        setProductsInfo(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [
    selectedCategories,
    selectedMetals,
    minPrice,
    maxPrice,
    selectedSortingType,
  ]);

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === "category") {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value));
    } else if (filterType === "metal") {
      setSelectedMetals((prev) => prev.filter((metal) => metal !== value));
    } else if (filterType === "price") {
      setMinPrice(null);
      setMaxPrice(null);
    }
  };

  const handleRemoveAllFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    productsInfo && (
      <div className="mx-auto my-0 flex flex-col items-center justify-center">
        <div className="lg:max-w-[780px] md:max-w-[500px] text-center">
          <h1 className="text-[40px]">
            {category
              ? category[0].toUpperCase() + category.slice(1)
              : "All Jewelry"}
          </h1>
          <div className="my-6">
            <p className="text-text-secondary tracking-wider leading-7">
              {jewelryDescriptions[category]
                ? jewelryDescriptions[category]
                : "Create a look that's all your own with our affordable, everyday jewelry. For a full layered look, stack our silver and gold necklaces or shop our pre-stacked necklaces. We also have everything you need for a killer ear stack — simple and statement earrings. If you need an arm candy look, simply stack up our rings and bracelets."}
            </p>
          </div>
        </div>
        <div className="pt-4 w-full text-text-secondary text-sm">
          <div className="w-full mb-5 md:flex justify-between max-md:space-y-2">
            <div className="flex justify-start md:justify-center items-center gap-5">
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
              <PriceDropdown
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                highestPrice={productsInfo.highestPrice}
              />
            </div>
            <div className="flex justify-start md:justify-center items-center gap-5">
              <h2 className="">Sort by:</h2>
              <SortDropdown
                items={sortingTypes}
                selectedItem={selectedSortingType}
                setSelectedItem={setSelectedSortingType}
              />
              <h2 className="">
                {productsInfo.totalProducts === productsInfo.products.length
                  ? ""
                  : productsInfo.products.length + " of"}{" "}
                {productsInfo.totalProducts}{" "}
                {productsInfo.totalProducts === 1 ? "product" : "products"}
              </h2>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <ul role="list" className="flex gap-4">
              {selectedCategories.map((category) => (
                <li
                  key={category}
                  className="mb-5 border-border-secondary border rounded-full px-2 py-1 flex gap-2 justify-center items-center"
                >
                  Category: {categoryTypes[category]}
                  <ButtonTag
                    buttonType="icon"
                    onClick={() => handleRemoveFilter("category", category)}
                    className="p-0"
                  >
                    <CloseIcon width={14} height={14} />
                  </ButtonTag>
                </li>
              ))}

              {selectedMetals.map((metal) => (
                <li
                  key={metal}
                  className="mb-5 border-border-secondary border rounded-full px-2 py-1 flex gap-2 justify-center items-center"
                >
                  Metal: {metalTypes[metal]}
                  <ButtonTag
                    buttonType="icon"
                    onClick={() => handleRemoveFilter("metal", metal)}
                    className="p-0"
                  >
                    <CloseIcon width={14} height={14} />
                  </ButtonTag>
                </li>
              ))}

              {(minPrice || maxPrice) && (
                <li className="mb-5 border-border-secondary border rounded-full px-2 py-1 flex gap-2 justify-center items-center">
                  Price: ${minPrice}.00 - $
                  {maxPrice || productsInfo.highestPrice}.00
                  <ButtonTag
                    buttonType="icon"
                    onClick={() => handleRemoveFilter("price")}
                    className="p-0"
                  >
                    <CloseIcon width={14} height={14} />
                  </ButtonTag>
                </li>
              )}
            </ul>
            {(selectedCategories.length > 0 ||
              selectedMetals.length > 0 ||
              minPrice ||
              maxPrice) && (
              <ButtonTag
                buttonType="icon"
                onClick={handleRemoveAllFilters}
                className="mb-5 hover:text-text-primary"
              >
                Remove all
              </ButtonTag>
            )}
          </div>
        </div>
        <ProductList products={productsInfo.products} />
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
