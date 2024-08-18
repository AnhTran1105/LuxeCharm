import ProductCard from "../components/ProductCard";
import FilterMenu from "../components/FilterMenu";
import { useRef } from "react";
import ProductList from "../components/ProductList";

function Jewelry() {
  const toggleMenuVisibility = useRef([]);

  const handleButtonClick = (index) => {
    if (toggleMenuVisibility.current[index]) {
      toggleMenuVisibility.current[index]();
    }
  };

  return (
    <div className="pt-10 pb-5">
      <div className="px-[50px] mx-auto my-0 flex flex-col items-center justify-center">
        <div className="lg:max-w-[780px] md:max-w-[500px] text-center">
          <h1 className="text-[40px]">All Jewelry</h1>
          <div className="mt-5">
            <p className="text-foreground75 tracking-[0.6px] leading-[28.8px]">
              Create a look that's all your own with our affordable, everyday
              jewelry. For a full layered look, stack our{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/silver"
              >
                silver
              </a>{" "}
              and gold{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/necklaces"
              >
                necklaces
              </a>{" "}
              or shop our{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/layer-up"
              >
                pre-stacked necklaces
              </a>
              . We also have everything you need for a killer ear stack —{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/dainty-jewelry"
              >
                simple
              </a>{" "}
              and{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/statement-earrings"
              >
                statement
              </a>
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/earrings"
              >
                &nbsp;earrings
              </a>
              . If you need an arm candy look, simply stack up our{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/rings"
              >
                rings
              </a>{" "}
              and{" "}
              <a
                className="underline underline-offset-3px text-black decoration-1 hover:decoration-2"
                href="/collections/bracelets"
              >
                bracelets
              </a>
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
        {/* Filter Form */}
        <div className="pt-[10px] flex w-full text-foreground75 text-sm">
          <div className="mb-5 w-full flex justify-between">
            <div className="flex justify-center items-center">
              <h2 className="mr-5">Filter:</h2>
              <FilterMenu
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
              <FilterMenu
                onToggleVisibility={(toggleFn) =>
                  (toggleMenuVisibility.current[4] = toggleFn)
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
        {/* End Filter Form  */}
        {/* Product List */}
        <ProductList />
        {/* End Product List  */}
        {/* Pagination */}
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
        {/* End Pagination */}
      </div>
    </div>
  );
}

export default Jewelry;
