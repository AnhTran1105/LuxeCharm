import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import LinkTag from "../components/CustomTags/LinkTag";

function Jewelry() {
  const [products, setProducts] = useState([]);
  const [sortingType, setSortingType] = useState("Featured");
  const [filters, setFilters] = useState({
    category: [],
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
        const filtersToSend = { ...filters, sort: sortingType };

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
  }, [filters, sortingType]);

  return (
    products && (
      <div className="pt-10 pb-5">
        <div className="px-[50px] mx-auto my-0 flex flex-col items-center justify-center">
          <div className="lg:max-w-[780px] md:max-w-[500px] text-center">
            <h1 className="text-[40px]">All Jewelry</h1>
            <div className="mt-5">
              <p className="text-text-secondary tracking-[0.6px] leading-[28.8px]">
                Create a look that's all your own with our affordable, everyday
                jewelry. For a full layered look, stack our{" "}
                <LinkTag
                  type="underline"
                  to="/collections/silver"
                  className="text-base text-text-primary"
                >
                  silver
                </LinkTag>{" "}
                and gold{" "}
                <LinkTag
                  type="underline"
                  to="/collections/necklaces"
                  className="text-base text-text-primary"
                >
                  necklaces
                </LinkTag>{" "}
                or shop our{" "}
                <LinkTag
                  type="underline"
                  to="/collections/prestack-necklaces"
                  className="text-base text-text-primary"
                >
                  prestack-necklaces
                </LinkTag>
                . We also have everything you need for a killer ear stack —{" "}
                <LinkTag
                  type="underline"
                  to="/collections/simple"
                  className="text-base text-text-primary"
                >
                  simple
                </LinkTag>{" "}
                and{" "}
                <LinkTag
                  type="underline"
                  to="/collections/statement"
                  className="text-base text-text-primary"
                >
                  statement
                </LinkTag>
                <LinkTag
                  type="underline"
                  to="/collections/earrings"
                  className="text-base text-text-primary"
                >
                  &nbsp;earrings
                </LinkTag>
                . If you need an arm candy look, simply stack up our{" "}
                <LinkTag
                  type="underline"
                  to="/collections/rings"
                  className="text-base text-text-primary"
                >
                  rings
                </LinkTag>{" "}
                and{" "}
                <LinkTag
                  type="underline"
                  to="/collections/bracelets"
                  className="text-base text-text-primary"
                >
                  bracelets
                </LinkTag>
                .
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5 mt-4 pb-2">
            <a className="text-center group" href="/">
              <div className="m-5 overflow-hidden">
                <img
                  srcSet="//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=165 165w,//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=330 330w,//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=535 535w,//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=750 750w,//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=1000 1000w,//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611 1200w
                "
                  src="//uncommonjames.com/cdn/shop/collections/Hearts_SMS.jpg?v=1718660611&amp;width=1500"
                  sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                  alt=""
                  height="1200"
                  width="1200"
                  loading="lazy"
                  className="aspect-[4/5] group-hover:scale-103 object-cover transition-transform duration-300 ease-linear"
                />
              </div>
              <div className="pt-4 pb-[10px]">
                <a href="/collections/hearts-collection" className="text-lg">
                  Hearts Collection
                </a>
              </div>
            </a>
            <a className="text-center group" href="/">
              <div className="m-5 overflow-hidden">
                <img
                  srcSet="//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=165 165w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=330 330w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=535 535w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=750 750w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=1000 1000w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=1500 1500w,//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648 2000w
                "
                  src="//uncommonjames.com/cdn/shop/collections/J11N-BEADCHAIN-GOLD-M-KC.jpg?v=1719498648&amp;width=1500"
                  sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                  alt=""
                  height="2000"
                  width="2000"
                  loading="lazy"
                  className="aspect-[4/5] group-hover:scale-103 object-cover transition-transform duration-300 ease-linear"
                />
              </div>
              <div className="pt-4 pb-[10px]">
                <a href="/collections/hearts-collection" className="text-lg">
                  Beaded Jewelry
                </a>
              </div>
            </a>
            <a className="text-center group" href="/">
              <div className="m-5 overflow-hidden">
                <img
                  srcSet="//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=165 165w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=330 330w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=535 535w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=750 750w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=1000 1000w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=1500 1500w,//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478 2000w
                "
                  src="//uncommonjames.com/cdn/shop/collections/Pearls_Nav1.jpg?v=1719498478&amp;width=1500"
                  sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                  alt=""
                  height="2000"
                  width="2000"
                  loading="lazy"
                  className="aspect-[4/5] group-hover:scale-103 object-cover transition-transform duration-300 ease-linear"
                />
              </div>
              <div className="pt-4 pb-[10px]">
                <a href="/collections/hearts-collection" className="text-lg">
                  Pearl Jewelry
                </a>
              </div>
            </a>
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
                <a
                  href="/collections/jewelry?page=2"
                  className="pagination-item"
                >
                  2
                </a>
              </li>
              <li className="max-w-[44px] mr-[10px] group">
                <a
                  href="/collections/jewelry?page=3"
                  className="pagination-item"
                >
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
      </div>
    )
  );
}

export default Jewelry;
