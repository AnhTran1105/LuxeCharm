import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { hideCart } from "../redux/cartModal/cartModalSlice";
import QuantityWidget from "./QuantityWidget";
import { fetchCart, removeFromCart } from "../redux/cart/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonTag from "./CustomTags/ButtonTag";
import AnchorTag from "./CustomTags/AnchorTag";
import { CloseIcon, TrashIcon } from "./SVG";

function Cart() {
  const { isShow } = useSelector((state) => state.cartModal);
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShow) {
      dispatch(fetchCart());
    }
  }, [isShow, dispatch]);

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
          className="fixed w-[500px] max-w-[calc(100%-20px)] top-0 right-0 bottom-0 m-[10px] rounded-2xl bg-white overflow-hidden transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogTitle className="border-b border-border-primary/15 py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
            Your cart
          </DialogTitle>
          <ButtonTag
            onClick={() => dispatch(hideCart())}
            buttonType="icon"
            className="absolute top-[10px] right-[10px] group"
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
                <li
                  key={item._id}
                  className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-primary/15 flex items-center"
                >
                  <div className="w-[90px]">
                    <AnchorTag
                      href={`/products/${item._id}?metal=${item.metal}`}
                    >
                      <img src={item.imageUrl} alt={item.name} />
                    </AnchorTag>
                  </div>
                  <div className="pl-5 w-full relative">
                    <ButtonTag
                      buttonType="icon"
                      onClick={() => {
                        dispatch(removeFromCart(item._id));
                      }}
                      className="absolute top-0 right-0"
                    >
                      <TrashIcon width={16} height={16} />
                    </ButtonTag>
                    <AnchorTag
                      href={`/products/${item._id}?metal=${item.metal}`}
                      className="font-SofiaBold leading-5 text-text-primary"
                    >
                      {item.name}
                    </AnchorTag>
                    {item.salePrice && (
                      <span className="ml-2 bg-background-primary w-fit px-3 py-1 rounded-full text-xs text-white">
                        Sale
                      </span>
                    )}
                    <div className="leading-3 text-xs">{item.metal}</div>
                    <div className="flex justify-between w-full items-center">
                      <div className="mt-[10px] text-left">
                        <QuantityWidget itemId={item._id} />
                      </div>
                      <div className="mt-2 text-right text-xs leading-4">
                        {item.salePrice ? (
                          <>
                            <span className="text-text-secondary line-through mr-2">
                              ${item.price}.00
                            </span>
                            <span className="">${item.salePrice}.00</span>
                          </>
                        ) : (
                          <span> ${item.price}.00</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border-primary/15 p-5 z-20 absolute bottom-0 right-0 left-0">
            <div className="flex justify-between font-SofiaBold mb-3">
              <div>
                {`Subtotal (${items.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)} ${items.length > 1 ? "items" : "item"})`}
                :
              </div>
              <div>${totalPrice}.00</div>
            </div>
            <ButtonTag
              onClick={() => {
                dispatch(hideCart());
                navigate("/checkout");
              }}
              className="py-2"
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
