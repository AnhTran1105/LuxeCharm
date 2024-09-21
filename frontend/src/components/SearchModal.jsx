import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import { CloseIcon, SearchIcon, StockIcon } from "./SVG";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchModal } from "../redux/searchModal/searchModalSlice";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import axios from "../utils/axios";
import Tippy from "@tippyjs/react/headless";
import { Rating } from "react-simple-star-rating";
import { statusTypes } from "../constants";
import { ClipLoader } from "react-spinners";

function SearchModal() {
  const { isOpened } = useSelector((state) => state.searchModal);
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce(async (term) => {
    if (!term) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("/products/search", {
        params: { search: term },
      });
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setLoading(false);
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    isOpened && (
      <Dialog
        open={isOpened}
        onClose={() => dispatch(closeSearchModal())}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <DialogPanel
          transition
          className={`fixed w-full top-0 left-0 bg-white transform transition-transform duration-300 ease 
         ${isOpened ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="py-9 flex justify-center items-center gap-2 mx-auto px-4 relative">
            <Tippy
              visible={searchTerm !== ""}
              interactive
              onClickOutside={() => dispatch(closeSearchModal())}
              placement="bottom"
              offset={[0, 1]}
              render={() => (
                <div
                  className="bg-white border border-t-0 border-border-tertiary pt-4 max-h-[calc(100vh-45px-2.25rem)] sm:max-h-[70vh] overflow-y-scroll"
                  style={{
                    width: searchRef.current
                      ? searchRef.current.offsetWidth
                      : "auto",
                  }}
                >
                  <div>
                    <div className="text-center text-sm">
                      {products.length === 0 ? (
                        "No products found"
                      ) : (
                        <div className="pb-2 border-b border-border-tertiary text-center text-sm">
                          {products.length}{" "}
                          {products.length > 1 ? "products" : "product"} found
                        </div>
                      )}
                    </div>
                    {!loading ? (
                      <div className="py-2">
                        {products.map((product) => (
                          <a
                            key={product._id}
                            href={`/products/${product._id}?metal=${product.metals[0].type}`}
                            className="flex text-sm px-6 py-2 sm:py-4 hover:bg-background-secondary"
                          >
                            <div className="w-24">
                              <img
                                src={product.metals[0].images.primary}
                                alt={product.name}
                                className="outline outline-[1px] outline-border-secondary"
                              />
                            </div>
                            <div className="pl-5 w-full relative">
                              <div className="flex items-center">
                                <h3 className="font-SofiaBold leading-5 text-text-primary">
                                  {product.name}
                                </h3>
                                {product.salePrice && (
                                  <span className="ml-2 bg-background-primary w-fit px-3 py-1 rounded-full text-xs text-white">
                                    Sale
                                  </span>
                                )}
                              </div>
                              <div>
                                <Rating
                                  transition={true}
                                  size={16}
                                  initialValue={
                                    Math.round(product.rating.avgRating * 10) /
                                    10
                                  }
                                  fillColor="#a16854"
                                  SVGclassName={`inline-block`}
                                  readonly={true}
                                  allowFraction={true}
                                />
                              </div>
                              <div className="mt-1">
                                <p
                                  className="flex gap-1 items-center uppercase text-[0.6rem] tracking-[1.3px] text-text-secondary"
                                  role="status"
                                >
                                  <StockIcon
                                    className={`
                                    ${
                                      product.metals[0].status === "inStock"
                                        ? "fill-[rgb(62,214,96)]"
                                        : product.metals[0].status ===
                                          "lowStock"
                                        ? "fill-[rgb(241,146,38)]"
                                        : "fill-[rgb(18,18,18)]"
                                    } scale-90
                                  `}
                                  />
                                  {statusTypes[product.metals[0].status]}
                                </p>
                              </div>
                              <div className="mt-1 flex justify-between w-full products-center">
                                <div className="text-right text-xs leading-4">
                                  {product.salePrice ? (
                                    <>
                                      <span className="text-text-secondary line-through mr-2">
                                        ${product.price}.00
                                      </span>
                                      <span className="">
                                        ${product.salePrice}.00
                                      </span>
                                    </>
                                  ) : (
                                    <span> ${product.price}.00</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <ClipLoader
                          loading={loading}
                          size={24}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                          color="#121212bf"
                          className=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            >
              <div
                className="field w-full max-w-[640px] relative"
                ref={searchRef}
              >
                <input
                  id="search"
                  required
                  type="text"
                  autoCapitalize="off"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  autoCorrect="off"
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-secondary"
                />
                <label htmlFor="search">Search</label>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center">
                  <ButtonTag
                    buttonType="icon"
                    onClick={() => setSearchTerm("")}
                    className="px-4 border-r border-solid border-border-primary/15 text-sm"
                  >
                    Clear
                  </ButtonTag>
                  <ButtonTag
                    buttonType="icon"
                    onClick={() => setSearchTerm("")}
                    className="px-4"
                  >
                    <SearchIcon width={20} height={20} />
                  </ButtonTag>
                </div>
              </div>
            </Tippy>
            <ButtonTag
              buttonType="icon"
              onClick={() => {
                dispatch(closeSearchModal());
              }}
              className="p-0"
            >
              <CloseIcon width={24} height={24} />
            </ButtonTag>
          </div>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default SearchModal;
