import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { hideCart } from "../redux/cartModal/cartModalSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import { useEffect } from "react";
import ButtonTag from "./CustomTags/ButtonTag";
import { CloseIcon } from "./SVG";
import CartItem from "./CartItem";

function Cart() {
  const { isShow } = useSelector((state) => state.cartModal);
  const { items, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShow) {
      dispatch(fetchCart());
    }
  }, [isShow, dispatch]);

  // console.log(items);

  return (
    isShow && (
      <Dialog
        open={isShow}
        onClose={() => dispatch(hideCart())}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <DialogPanel
          transition
          className="fixed w-full min-[440px]:w-4/5 sm:w-3/5 lg:w-1/2 xl:w-1/3 top-0 right-0 bottom-0 bg-white overflow-hidden transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogTitle className="border-b border-border-primary/15 px-5 pt-4 pb-3 text-center uppercase font-SofiaBold text-sm">
            Your cart
          </DialogTitle>
          <ButtonTag
            onClick={() => dispatch(hideCart())}
            buttonType="icon"
            className="absolute top-2 right-2 group"
          >
            <CloseIcon width={20} height={20} />
          </ButtonTag>
          {items.length === 0 ? (
            <div className="py-10 px-5 border-b border-border-primary/15 text-center">
              <div>Your cart is empty!</div>
              <div>Add your favorite items to your cart.</div>
            </div>
          ) : (
            <ul
              role="list"
              className="max-h-[calc(100%-165px)] overflow-y-auto"
            >
              {[...items].reverse().map((item) => (
                <CartItem key={item.metalVariantId} item={item} />
              ))}
            </ul>
          )}

          <div className="border-t border-border-primary/15 p-5 z-20 absolute bottom-0 right-0 left-0">
            <div className="flex justify-between font-SofiaBold mb-3">
              <div>
                {`Subtotal (${items.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)} ${
                  items.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0) > 1
                    ? "items"
                    : "item"
                })`}
                :
              </div>
              <div>${totalPrice}.00</div>
            </div>
            <ButtonTag
              disabled={items.length === 0}
              onClick={() => {
                dispatch(hideCart());
                window.location.href = "/checkout";
              }}
              className={`py-2`}
            >
              Check out
            </ButtonTag>
          </div>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default Cart;
