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
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/70" />
          <div className="fixed inset-0 flex w-screen items-center justify-end">
            <DialogPanel className="max-w-[calc(100%-20px)] space-y-4 bg-white p-12">
              <DialogTitle className="font-bold">Your cart</DialogTitle>
              <button className="button"></button>
              <Description>
                This will permanently deactivate your account
              </Description>
              <p>
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed.
              </p>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
  );
}

export default Cart;
