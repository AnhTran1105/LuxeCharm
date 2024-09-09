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
import Button from "../components/Button";

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
        const response = await axios.post("/order", data, {
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
      <h1 className="text-[40px]">Checkout</h1>
      <div className="mx-auto w-4/5 grid grid-cols-2 gap-12 mt-10">
        <div className="">
          <div className="text-center border border-border rounded-2xl">
            <div className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Delivery Information
            </div>
            <form className="p-5 text-sm text-color-foreground/75">
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="email">Your account</label>
              </div>
              {errors.email && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    className="fill-red mr-2"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    id="exclamation-mark"
                  >
                    <path
                      d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
    	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                    ></path>
                  </svg>

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
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                  />
                  <label htmlFor="firstName">First name*</label>
                </div>
                {errors.firstName && (
                  <p className="text-left px-4 pt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      className="fill-red mr-2"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      id="exclamation-mark"
                    >
                      <path
                        d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
        	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                      ></path>
                    </svg>

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
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                  />
                  <label htmlFor="lastName">Last name*</label>
                </div>
                {errors.lastName && (
                  <p className="text-left px-4 pt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      className="fill-red mr-2"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      id="exclamation-mark"
                    >
                      <path
                        d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
        	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                      ></path>
                    </svg>

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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="address">Address*</label>
              </div>
              {errors.address && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    className="fill-red mr-2"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    id="exclamation-mark"
                  >
                    <path
                      d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
    	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                    ></path>
                  </svg>

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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="phoneNumber">Phone number*</label>
              </div>
              {errors.phoneNumber && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    className="fill-red mr-2"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    id="exclamation-mark"
                  >
                    <path
                      d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
    	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                    ></path>
                  </svg>

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
                  className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="notes">Order notes</label>
              </div>
              {errors.notes && (
                <p className="text-left px-4 pt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    className="fill-red mr-2"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    id="exclamation-mark"
                  >
                    <path
                      d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                    ></path>
                  </svg>

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
          <div className="text-center border border-border rounded-2xl">
            <div className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Your cart
            </div>
            <ul role="list" className="">
              {[...items].reverse().map((item) => (
                <li
                  key={item.product._id}
                  className="mx-5 py-5 [&:not(:last-child)]:border-b border-border flex items-center"
                >
                  <div className="w-[90px]">
                    <a href={`/products/${item.product._id}`} tabIndex={-1}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    </a>
                  </div>
                  <div className="pl-5 w-full relative">
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item.product._id));
                      }}
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
                    <div className="text-left">
                      <a
                        href={`/products/${item.product._id}`}
                        alt={item.product.name}
                        className="mr-2 font-SofiaBold text-sm leading-5"
                        tabIndex={0}
                      >
                        {item.product.name}
                      </a>
                      {item.salePrice && (
                        <span className="bg-primary w-fit px-3 py-1 rounded-full text-xs text-white">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="leading-3 text-xs text-left">
                      {item.metal}
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <div className="mt-[10px] text-left">
                        <QuantityWidget itemId={item.product._id} />
                      </div>
                      <div className="mt-[5px] text-right text-xs leading-4">
                        ${item.product.price * item.quantity}.00
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-5">
              <div className="flex justify-between mb-3">
                <div className="">
                  {`Subtotal (${items.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)} ${items.length > 1 ? "items" : "item"})`}
                  :
                </div>
                <div>${totalPrice}.00</div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="">Shipping fee:</div>
                <div>$0.00</div>
              </div>
              <div className="flex font-SofiaBold justify-between mb-3">
                <div className="">Total:</div>
                <div>${totalPrice}.00</div>
              </div>
              <Button
                title="Pay with Stripe"
                className="h-auto py-2"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
