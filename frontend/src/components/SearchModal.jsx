import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverPanel,
} from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import { NavLink } from "react-router-dom";
import { CloseIcon, AccountIcon } from "./SVG";
import AnchorTag from "./CustomTags/AnchorTag";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchModal } from "../redux/searchModal/searchModalSlice";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import axios from "../utils/axios";

function SearchModal() {
  const { isOpened } = useSelector((state) => state.searchModal);
  const dispatch = useDispatch();

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

  console.log(products);

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
          className={`fixed w-full top-0 left-0 bg-white overflow-hidden transform transition-transform duration-300 ease 
         ${isOpened ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="w-full max-w-[742px] py-9 flex justify-center items-center gap-2 mx-auto relative">
            <div className="field">
              <input
                id="search"
                required
                type="text"
                autoCapitalize="off"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                autoCorrect="off"
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-secondary"
              />
              <label htmlFor="search">Search</label>
            </div>
            <ButtonTag buttonType="icon">
              <CloseIcon width={24} height={24} />
            </ButtonTag>

            {searchTerm && (
              <Popover className="absolute top-full left-0 w-full z-[9999]">
                <PopoverPanel className="bg-white border border-gray-200 rounded-md shadow-lg mt-2 p-4">
                  {loading ? (
                    <div>Loading...</div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <NavLink
                        key={product._id}
                        to={`/products/${product._id}`}
                        className="block p-2 hover:bg-gray-100"
                        onClick={() => dispatch(closeSearchModal())}
                      >
                        <div className="flex items-center">
                          <img
                            src={product.metals[0].images.primary}
                            alt={product.name}
                            className="w-12 h-12 object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-700">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.salePrice
                                ? `$${product.salePrice}`
                                : `$${product.price}`}
                            </p>
                          </div>
                        </div>
                      </NavLink>
                    ))
                  ) : (
                    <div>No products found.</div>
                  )}
                </PopoverPanel>
              </Popover>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default SearchModal;
