import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import QuantityWidget from "../components/QuantityWidget";
import { removeFromCart } from "../redux/cart/cartSlice";
import ButtonTag from "../components/CustomTags/ButtonTag";
import { WarningIcon, StripeIcon, TrashIcon } from "../components/SVG";
import AnchorTag from "../components/CustomTags/AnchorTag";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    email: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    notes: yup.string(),
  })
  .required();

function Checkout() {
  const dispatch = useDispatch();

  const { items, totalPrice } = useSelector((state) => state.cart);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/users/my-account", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setValue("email", response.email);
        setValue("firstName", response.firstName);
        setValue("lastName", response.lastName);
        setValue("address", response.address);
        setValue("phoneNumber", response.phoneNumber);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setValue]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const onSubmit = (formData) => {
    dispatch(startLoading());
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("address", formData.address);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("notes", formData.notes);

    (async () => {
      try {
        const response = await axios.post("/orders", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        if (response.url) {
          window.location.href = response.url;
        }
      } catch (error) {
        dispatch(sendMessage({ message: error.message, type: "error" }));
        console.error("Error during checkout:", error);
      } finally {
        dispatch(stopLoading());
      }
    })();
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 px-[50px]">
      <h1 className="text-4xl">Checkout</h1>
      <div className="mx-auto w-4/5 grid grid-cols-2 gap-12 mt-10">
        <div className="">
          <div className="text-center border border-border-primary">
            <div className="border-b border-border-primary py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Delivery Information
            </div>
            <form className="p-5 text-sm text-text-secondary">
              <div className="field">
                <input
                  id="email"
                  autoComplete="email"
                  required
                  autoCapitalize="off"
                  placeholder="email"
                  disabled
                  autoCorrect="off"
                  {...register("email")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                />
                <label htmlFor="email">Your account</label>
              </div>
              {errors.email && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <WarningIcon width={20} height={20} />
                  <span className="first-letter:capitalize">
                    {errors.email?.message}
                  </span>
                </p>
              )}
              <div className="flex gap-3">
                <div className="field !mt-5">
                  <input
                    id="firstName"
                    autoComplete="firstName"
                    required
                    autoCapitalize="off"
                    placeholder="firstName"
                    autoCorrect="off"
                    {...register("firstName")}
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                  />
                  <label htmlFor="firstName">First name*</label>
                </div>
                {errors.firstName && (
                  <p className="text-left px-4 pt-2 flex items-center">
                    <WarningIcon width={20} height={20} />
                    <span className="first-letter:capitalize">
                      {errors.firstName?.message}
                    </span>
                  </p>
                )}
                <div className="field">
                  <input
                    id="lastName"
                    autoComplete="lastName"
                    required
                    autoCapitalize="off"
                    placeholder="lastName"
                    autoCorrect="off"
                    {...register("lastName")}
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                  />
                  <label htmlFor="lastName">Last name*</label>
                </div>
                {errors.lastName && (
                  <p className="text-left px-4 pt-2 flex items-center">
                    <WarningIcon width={20} height={20} />
                    <span className="first-letter:capitalize">
                      {errors.lastName?.message}
                    </span>
                  </p>
                )}
              </div>
              <div className="field">
                <input
                  id="address"
                  autoComplete="address"
                  required
                  autoCapitalize="off"
                  placeholder="address"
                  autoCorrect="off"
                  {...register("address")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                />
                <label htmlFor="address">Address*</label>
              </div>
              {errors.address && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <WarningIcon width={20} height={20} />
                  <span className="first-letter:capitalize">
                    {errors.address?.message}
                  </span>
                </p>
              )}
              <div className="field">
                <input
                  id="phoneNumber"
                  autoComplete="phoneNumber"
                  required
                  autoCapitalize="off"
                  placeholder="phoneNumber"
                  autoCorrect="off"
                  {...register("phoneNumber")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                />
                <label htmlFor="phoneNumber">Phone number*</label>
              </div>
              {errors.phoneNumber && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <WarningIcon width={20} height={20} />
                  <span className="first-letter:capitalize">
                    {errors.phoneNumber?.message}
                  </span>
                </p>
              )}
              <div className="field">
                <textarea
                  rows="4"
                  id="notes"
                  autoComplete="notes"
                  required
                  autoCapitalize="off"
                  placeholder="notes"
                  autoCorrect="off"
                  {...register("notes")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                />
                <label htmlFor="notes">Order notes</label>
              </div>
              {errors.notes && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <WarningIcon width={20} height={20} />
                  <span className="first-letter:capitalize">
                    {errors.notes?.message}
                  </span>
                </p>
              )}
            </form>
            <p className="mb-5 text-sm">* indicates a required field</p>
          </div>
        </div>
        <div className="">
          <div className="text-center border border-border-primary">
            <div className="border-b border-border-primary py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Your cart
            </div>
            <ul role="list" className="">
              {[...items].reverse().map((item) => (
                <li
                  key={item._id}
                  className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-secondary flex items-center"
                >
                  <div className="w-[90px]">
                    <AnchorTag
                      href={`/products/${item._id}?metal=${item.metal}`}
                    >
                      <img src={item.imageUrl} alt={item.name} />
                    </AnchorTag>
                  </div>
                  <div className="pl-5 w-full relative text-left">
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
                            <span className="text-sm">
                              ${item.salePrice}.00
                            </span>
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
            <div className="border-t border-border p-5">
              <div className="flex justify-between mb-3 text-sm">
                <div className="">
                  {`Subtotal (${items.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)} ${
                    items.reduce((total, item) => {
                      return total + item.quantity;
                    }, 0)
                      ? "items"
                      : "item"
                  })`}
                  :
                </div>
                <div>${totalPrice}.00</div>
              </div>
              <div className="flex justify-between mb-3 text-sm">
                <div className="">Shipping fee:</div>
                <div>$0.00</div>
              </div>
              <div className="flex font-SofiaBold justify-between mb-3">
                <div className="">Total:</div>
                <div>${totalPrice}.00</div>
              </div>
              <ButtonTag
                onClick={handleSubmit(onSubmit)}
                className="bg-[#646fde] border-none text-white flex justify-center items-center gap-2 hover:bg-[#5762c1] py-0"
              >
                Buy with
                <StripeIcon width={45.5} height={45.5} />
              </ButtonTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
