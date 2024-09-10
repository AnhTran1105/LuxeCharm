import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import QuantityWidget from "../components/QuantityWidget";
import { removeFromCart } from "../redux/cart/cartSlice";
import Button from "../components/Button";
import { logout } from "../redux/auth/authSlice";
import moment from "moment";

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

function Account() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

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
        const accountResponse = await axios.get("/users/my-account", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setValue("email", accountResponse.email);
        setValue("firstName", accountResponse.firstName);
        setValue("lastName", accountResponse.lastName);
        setValue("address", accountResponse.address);
        setValue("phoneNumber", accountResponse.phoneNumber);

        const ordersResponse = await axios.get("/orders", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setOrders(ordersResponse);
        console.log(ordersResponse);
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

  console.log(orders);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-[50px]">
      <h1 className="text-[40px]">Account</h1>
      <button
        type="button"
        onClick={() => dispatch(logout())}
        className="group leading-5 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="logout"
        >
          <path
            className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
            fillRule="evenodd"
            d="M3 12.5h12v-1H3v1Z"
            clipRule="evenodd"
          ></path>
          <path
            className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
            fillRule="evenodd"
            d="m6.146 8.146-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5.708-.707L3.707 12l3.147-3.146-.708-.708zM8.5 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v16a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5v-3h1v2.5h11v-15h-11V7h-1V4z"
            clipRule="evenodd"
          ></path>
        </svg>
        Logout
      </button>
      <div className="mx-auto w-4/5 grid grid-cols-2 gap-12 mt-10">
        <div className="">
          <div className="text-center border border-border rounded-2xl">
            <div className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Account Information
            </div>
            <div className="flex justify-end pr-5 gap-4 p-2">
              <button className="link !text-sm">Edit</button>
              <button className="link !text-sm">Change password</button>
            </div>
            <form className="px-5 pb-5 text-sm text-color-foreground/75">
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
                <label htmlFor="email">Email</label>
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
            </form>
            <p className="mb-5 text-sm">* indicates a required field</p>
          </div>
        </div>
        <div className="">
          <div className="text-center border border-border rounded-2xl">
            <div className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
              Your purchase
            </div>
            <ul role="list" className="">
              {orders &&
                [...orders].reverse().map((item) => (
                  <li
                    key={item._id}
                    className="border-t border-border first:border-t-0"
                  >
                    <div>Status: {item.status}</div>
                    <div>Order number: {item.orderNumber}</div>
                    <div>Date: {moment(item.screatedAt).format("ll")} </div>
                    {item.cartItems.map((cartItem) => (
                      <li
                        key={cartItem._id}
                        className="mx-5 py-5 [&:not(:last-child)]:border-b border-border flex items-center"
                      >
                        <div className="w-[90px]">
                          <a
                            href={`/products/${cartItem.productId}`}
                            tabIndex={-1}
                          >
                            <img src={cartItem.imageUrl} alt={cartItem.name} />
                          </a>
                        </div>
                        <div className="pl-5 w-full relative">
                          <div className="text-left">
                            <a
                              href={`/products/${cartItem._id}`}
                              alt={cartItem.name}
                              className="mr-2 font-SofiaBold text-sm leading-5"
                              tabIndex={0}
                            >
                              {cartItem.name}
                            </a>
                          </div>
                          <div className="leading-3 text-xs text-left">
                            {cartItem.metal}
                          </div>
                          <div className="flex justify-between w-full items-center">
                            <div className="mt-[10px] text-left text-xs">
                              Quantity: {cartItem.quantity}
                            </div>
                            <div className="mt-[5px] text-right text-xs leading-4">
                              <span>
                                {" "}
                                ${cartItem.salePrice || cartItem.price}.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </li>
                ))}
            </ul>
            {/* <div className="border-t border-border p-5">
              <div className="flex justify-between mb-3 text-sm">
                <div className="">
                  {`Subtotal (${items.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)} ${items.length > 1 ? "items" : "item"})`}
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
              <Button
                title="Buy with"
                onClick={handleSubmit(onSubmit)}
                svgIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={48}
                    height={48}
                    id="stripe"
                  >
                    <path
                      fill="#fff"
                      d="M11.319 9.242h1.673v5.805h-1.673zM4.226 13.355c0-2.005-2.547-1.644-2.547-2.403l.001.002c0-.262.218-.364.567-.368a3.7 3.7 0 0 1 1.658.432V9.434a4.4 4.4 0 0 0-1.654-.307C.9 9.127 0 9.839 0 11.029c0 1.864 2.532 1.561 2.532 2.365 0 .31-.266.413-.638.413-.551 0-1.264-.231-1.823-.538v1.516a4.591 4.591 0 0 0 1.819.382c1.384-.001 2.336-.6 2.336-1.812zM11.314 8.732l1.673-.36V7l-1.673.36zM16.468 9.129a1.86 1.86 0 0 0-1.305.527l-.086-.417H13.61V17l1.665-.357.004-1.902c.24.178.596.425 1.178.425 1.193 0 2.28-.879 2.28-3.016.004-1.956-1.098-3.021-2.269-3.021zm-.397 4.641c-.391.001-.622-.143-.784-.318l-.011-2.501c.173-.193.413-.334.795-.334.607 0 1.027.69 1.027 1.569.005.906-.408 1.584-1.027 1.584zm5.521-4.641c-1.583 0-2.547 1.36-2.547 3.074 0 2.027 1.136 2.964 2.757 2.964.795 0 1.391-.182 1.845-.436v-1.266c-.454.231-.975.371-1.635.371-.649 0-1.219-.231-1.294-1.019h3.259c.007-.087.022-.44.022-.602H24c0-1.725-.825-3.086-2.408-3.086zm-.889 2.448c0-.758.462-1.076.878-1.076.409 0 .844.319.844 1.076h-1.722zm-13.251-.902V9.242H6.188l-.004-1.459-1.625.349-.007 5.396c0 .997.743 1.641 1.729 1.641.548 0 .949-.103 1.171-.224v-1.281c-.214.087-1.264.398-1.264-.595v-2.395h1.264zm3.465.114V9.243c-.225-.08-1.001-.227-1.391.496l-.102-.496h-1.44v5.805h1.662v-3.907c.394-.523 1.058-.42 1.271-.352z"
                    ></path>
                  </svg>
                }
                className="bg-[#646fde] border-none text-white flex justify-center items-center gap-2 h-10 hover:!bg-[#5762c1] mt-4"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
