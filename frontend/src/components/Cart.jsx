import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideCart } from "../redux/cartModal/cartModalSlice";
import QuantityWidget from "./QuantityWidget";
import { removeFromCart } from "../redux/cart/cartSlice";

function Cart() {
  const { isShow } = useSelector((state) => state.cartModal);
  const cartItems = useSelector((state) => state.cart.items);

  const [values, setValues] = useState(1);
  const dispatch = useDispatch();

  //   console.log(values);

  return (
    isShow && (
      <>
        <Dialog
          open={isShow}
          onClose={() => dispatch(hideCart())}
          className="relative z-[9999]"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/70" />
          <DialogPanel
            transition
            className="fixed w-[500px] max-w-[calc(100%-20px)] top-0 right-0 bottom-0 m-[10px] rounded-2xl bg-white overflow-hidden transition duration-300 ease-out data-[closed]:opacity-0"
          >
            <DialogTitle className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Your cart
            </DialogTitle>
            <button
              onClick={() => dispatch(hideCart())}
              className="absolute top-[10px] right-[10px] p-1 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                id="close"
              >
                <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </button>
            {cartItems.length === 0 ? (
              <div className="py-10 px-5 border-b border-border text-center">
                <div>Your cart is empty!</div>
                <div>Add your favorite items to your cart.</div>
              </div>
            ) : (
              <ul
                role="list"
                className="max-h-[calc(100%-165px)] overflow-y-auto"
              >
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="mx-5 py-5 [&:not(:last-child)]:border-b border-border flex items-center"
                  >
                    <div className="w-[90px]">
                      <a href={`/products/${item._id}`} tabIndex={-1}>
                        <img src={item.backgroundImage} alt={item.name} />
                      </a>
                    </div>
                    <div className="pl-5 w-full relative">
                      <button
                        onClick={() => dispatch(removeFromCart(item))}
                        className="absolute top-0 right-0 w-5 h-5 group leading-5 flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 96 96"
                          className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                          id="trash"
                        >
                          <switch>
                            <g>
                              <path d="M84 22H68v-4c0-6.63-5.37-12-12-12H40c-6.63 0-12 5.37-12 12v4H12a4 4 0 0 0 0 8h4v48c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12V30h4a4 4 0 0 0 0-8zm-48-4c0-2.21 1.79-4 4-4h16c2.21 0 4 1.79 4 4v4H36v-4zm36 60c0 2.21-1.79 4-4 4H28c-2.21 0-4-1.79-4-4V30h48v48z"></path>
                            </g>
                          </switch>
                        </svg>
                      </button>
                      <a
                        href={`/products/${item._id}`}
                        alt={item.name}
                        className="mr-[30px] font-SofiaBold text-sm leading-5"
                        tabIndex={0}
                      >
                        {item.name}
                      </a>
                      <div className="leading-3 text-xs">{item.metals[0]}</div>
                      <div className="flex justify-between w-full items-center">
                        <div className="mt-[10px] text-left">
                          <QuantityWidget onChangeValue={setValues} />
                        </div>
                        <div className="mt-[5px] text-right text-xs leading-4">
                          ${item.price * item.quantity}.00
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-border p-5 z-20 absolute bottom-0 right-0 left-0">
              <div className="flex justify-between font-SofiaBold mb-3">
                <div>Subtotal (2 items):</div>
                <div>$116.00</div>
              </div>
              <button className="w-full border-f border border-solid p-2 hover:bg-hover hover:text-white">
                Check out
              </button>
            </div>
          </DialogPanel>
        </Dialog>
      </>
    )
  );
}

export default Cart;
