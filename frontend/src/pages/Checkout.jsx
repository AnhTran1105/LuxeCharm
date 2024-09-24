import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import ButtonTag from "../components/CustomTags/ButtonTag";
import { StripeIcon } from "../components/SVG";
import ErrorMessage from "../components/ErrorMessage";
import CartItem from "../components/CartItem";

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
        setValue("email", response.data.email);
        setValue("firstName", response.data.firstName);
        setValue("lastName", response.data.lastName);
        setValue("address", response.data.address);
        setValue("phoneNumber", response.data.phoneNumber);
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
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes,
      cart: { items, totalPrice },
    };

    (async () => {
      try {
        const response = await axios.post("/orders", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        dispatch(sendMessage({ message: error.data.message, type: "error" }));
        console.error("Error during checkout:", error);
      } finally {
        dispatch(stopLoading());
      }
    })();
  };

  console.log(items);

  return (
    <section className="w-full text-center">
      <h1 className="text-4xl">Checkout</h1>
      <div className="mx-auto w-full sm:w-4/5 md:w-full xl:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="">
          <div className="text-center border border-border-primary">
            <div className="border-b border-border-primary py-2 px-5 text-center uppercase font-SofiaBold text-sm leading-7">
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-text-primary"
                />
                <label htmlFor="email">Your account</label>
              </div>
              {errors.email && <ErrorMessage message={errors.email?.message} />}
              <div className="double-field mt-5">
                <div className="field">
                  <input
                    id="firstName"
                    autoComplete="firstName"
                    required
                    autoCapitalize="off"
                    placeholder="firstName"
                    autoCorrect="off"
                    {...register("firstName")}
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-text-primary"
                  />
                  <label htmlFor="firstName">First name*</label>
                </div>
                {errors.firstName && (
                  <ErrorMessage message={errors.firstName?.message} />
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
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-text-primary"
                  />
                  <label htmlFor="lastName">Last name*</label>
                </div>
                {errors.lastName && (
                  <ErrorMessage message={errors.lastName?.message} />
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-text-primary"
                />
                <label htmlFor="address">Address*</label>
              </div>
              {errors.address && (
                <ErrorMessage message={errors.address?.message} />
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-text-primary"
                />
                <label htmlFor="phoneNumber">Phone number*</label>
              </div>
              {errors.phoneNumber && (
                <ErrorMessage message={errors.phoneNumber?.message} />
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] text-base text-text-primary"
                />
                <label htmlFor="notes">Order notes</label>
              </div>
              {errors.notes && <ErrorMessage message={errors.notes?.message} />}
            </form>
            <p className="mb-5 text-sm">* indicates a required field</p>
          </div>
        </div>
        <div className="">
          <div className="text-center border border-border-primary">
            <div className="border-b border-border-primary py-2 px-5 text-center uppercase font-SofiaBold text-sm leading-7">
              Your cart
            </div>
            <ul role="list" className="">
              {[...items].reverse().map((item) => (
                <CartItem key={item.metalVariantId} item={item} />
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
    </section>
  );
}

export default Checkout;
