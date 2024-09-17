import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import AnchorTag from "../components/CustomTags/AnchorTag";
import { useParams } from "react-router-dom";

function Jewelry() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortingType, setSortingType] = useState("Featured");
  const [filters, setFilters] = useState({
    metal: [],
    price: {
      from: null,
      to: null,
    },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    (async () => {
      try {
        const filtersToSend = {
          ...filters,
          category: [category[0].toUpperCase() + category.slice(1)],
          sort: sortingType,
        };

        if (
          filtersToSend.price?.from === null &&
          filtersToSend.price?.to === null
        ) {
          delete filtersToSend.price;
        }

        if (filtersToSend.metal.length > 0) {
          filtersToSend.metal = filtersToSend.metal.join(",");
        }

        const response = await axios.get("/products", {
          params: filtersToSend,
        });
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [filters, category, sortingType]);

  return (
    products && (
      <div className="mx-auto my-0 flex flex-col items-center justify-center">
        <div className="lg:max-w-[780px] md:max-w-[500px] text-center">
          <h1 className="text-[40px]">
            {category[0].toUpperCase() + category.slice(1)}
          </h1>
          <div className="my-6">
            <p className="text-text-secondary tracking-[0.6px] leading-[28.8px]">
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
        <Filter
          sortingType={sortingType}
          setSortingType={setSortingType}
          onFilterChange={handleFilterChange}
          filteredProductQuantity={products.length}
          maxPrice={products.reduce((maxPrice, product) => {
            const currentPrice =
              product.salePrice !== null ? product.salePrice : product.price;
            return Math.max(maxPrice, currentPrice);
          }, 0)}
        />
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
