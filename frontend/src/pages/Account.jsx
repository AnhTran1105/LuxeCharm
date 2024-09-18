import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { fetchCart } from "../redux/cart/cartSlice";
import { logout } from "../redux/auth/authSlice";
import moment from "moment";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ButtonTag from "../components/CustomTags/ButtonTag";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    email: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

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

    (async () => {
      try {
        const response = await axios.put("/users/update-info", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        dispatch(sendMessage({ message: response.message, type: "success" }));
        setRefresh(isRefresh);
      } catch (error) {
        dispatch(sendMessage({ message: error.message, type: "error" }));
        console.error("Error during checkout:", error);
      } finally {
        dispatch(stopLoading());
      }
    })();
  };

  useEffect(() => {}, [isRefresh]);

  return (
    <>
      <section className="w-full max-w-[440px] text-center mx-auto">
        <h1 className="text-[40px]">Account</h1>
        <div className="mt-6 space-y-6">
          <div className="">
            <div className="text-center border border-border-primary">
              <div className="border-b border-border-primary py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
                Account Information
              </div>
              <div className="flex justify-end pr-5 gap-4 p-2">
                <ButtonTag
                  onClick={() => setEditMode(!editMode)}
                  className="px-2 py-1 w-fit"
                >
                  {editMode ? "Cancel edit" : "Edit"}
                </ButtonTag>
                <ButtonTag
                  onClick={() => setIsOpened(true)}
                  className="px-2 py-1 w-fit"
                >
                  Change password
                </ButtonTag>
                <ButtonTag
                  onClick={() => dispatch(logout())}
                  className="px-2 py-1 w-fit"
                >
                  Logout
                </ButtonTag>
              </div>
              {editMode && (
                <p className="mb-4 mt-2 text-sm">
                  * indicates a required field
                </p>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-5 pb-5 text-sm text-text-secondary"
              >
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
                  <label htmlFor="email">Email</label>
                </div>
                {errors.email && (
                  <ErrorMessage message={errors.email?.message} />
                )}
                <div className="flex gap-3">
                  <div className="field !mt-5">
                    <input
                      id="firstName"
                      autoComplete="firstName"
                      required
                      autoCapitalize="off"
                      placeholder="firstName"
                      disabled={!editMode}
                      autoCorrect="off"
                      {...register("firstName")}
                      className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                    />
                    <label htmlFor="firstName">
                      First name{editMode && "*"}
                    </label>
                  </div>
                  {errors.firstName && (
                    <ErrorMessage message={errors.firstName?.message} />
                  )}
                  <div className="field">
                    <input
                      id="lastName"
                      autoComplete="lastName"
                      required
                      disabled={!editMode}
                      autoCapitalize="off"
                      placeholder="lastName"
                      autoCorrect="off"
                      {...register("lastName")}
                      className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                    />
                    <label htmlFor="lastName">Last name{editMode && "*"}</label>
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
                    disabled={!editMode}
                    autoCapitalize="off"
                    placeholder="address"
                    autoCorrect="off"
                    {...register("address")}
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                  />
                  <label htmlFor="address">Address{editMode && "*"}</label>
                </div>
                {errors.address && (
                  <ErrorMessage message={errors.address?.message} />
                )}
                <div className="field">
                  <input
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    required
                    disabled={!editMode}
                    autoCapitalize="off"
                    placeholder="phoneNumber"
                    autoCorrect="off"
                    {...register("phoneNumber")}
                    className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
                  />
                  <label htmlFor="phoneNumber">
                    Phone number{editMode && "*"}
                  </label>
                </div>
                {errors.phoneNumber && (
                  <ErrorMessage message={errors.phoneNumber?.message} />
                )}
                {editMode && (
                  <ButtonTag type="submit" className="mt-5">
                    Update
                  </ButtonTag>
                )}
              </form>
            </div>
          </div>
          <div className="">
            <div className="text-center border border-border-primary">
              <div className="border-b border-border-primary py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
                Your purchase
              </div>
              <ul role="list" className="">
                {orders && orders.length > 0 ? (
                  [...orders].reverse().map((item) => (
                    <li
                      key={item._id}
                      className="border-t border-border-primary first:border-t-0"
                    >
                      <div className="px-5 pt-5 grid grid-cols-2 gap-1 text-left text-sm text-text-primary">
                        <div>
                          <span className="font-SofiaBold">Status:</span>{" "}
                          {item.status}
                        </div>
                        <div>
                          <span className="font-SofiaBold">Order number:</span>{" "}
                          {item.orderNumber}
                        </div>
                        <div>
                          <span className="font-SofiaBold">Purchase date:</span>{" "}
                          {moment(item.createdAt).format("ll")}{" "}
                        </div>
                        <div>
                          <span className="font-SofiaBold">Total:</span>{" "}
                          {item.cartItems.reduce((total, item) => {
                            return total + (item.salePrice || item.price);
                          }, 0)}{" "}
                          USD
                        </div>
                        {item.notes && <div>Notes: {item.notes}</div>}
                      </div>
                      {item.cartItems.map((cartItem) => (
                        <li
                          key={cartItem._id}
                          className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-secondary flex items-center"
                        >
                          <div className="w-[90px]">
                            <a
                              href={`/products/${cartItem.productId}`}
                              tabIndex={-1}
                            >
                              <img
                                src={cartItem.imageUrl}
                                alt={cartItem.name}
                              />
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
                  ))
                ) : (
                  <div className="p-5 flex justify-center items-center gap-1 text-sm">
                    <div>You haven't placed any orders yet.</div>
                    <ButtonTag onClick={() => navigate("/")}>
                      Shopping now
                    </ButtonTag>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ChangePasswordModal isOpened={isOpened} setIsOpened={setIsOpened} />
    </>
  );
}

export default Account;
