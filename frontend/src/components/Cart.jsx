import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideCart } from "../redux/cart/cartSlice";

function Cart() {
  const { isShow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
            <DialogTitle className="font-bold border-b border-[#e8e3dd] py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
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
            {/* <div className="py-10 px-5 border-b border-[#e8e3dd] text-center">
              <div>Your cart is empty!</div>
              <div>Add your favorite items to your cart.</div>
            </div> */}
            <ul role="list">
              <li className="mx-5 py-5 border-b border-[#e8e3dd] flex items-center">
                <div className="w-[90px]">
                  <a href="/products/" tabIndex={-1}>
                    <img
                      src="	https://cdn.shopify.com/s/files/1/1847/2245/files/J18N-ENVIOUS-GOLD-1_240x240.jpg?v=1722357919"
                      alt=""
                    />
                  </a>
                </div>
                <div className="pl-5">
                  <a
                    href="/products/"
                    alt=""
                    className="mr-[30px] font-SofiaBold text-sm leading-5"
                    tabIndex={0}
                  >
                    Envious Lariat Necklace
                  </a>
                  <div>Gold</div>
                </div>
              </li>
            </ul>
          </DialogPanel>
        </Dialog>
      </>
    )
  );
}

export default Cart;
