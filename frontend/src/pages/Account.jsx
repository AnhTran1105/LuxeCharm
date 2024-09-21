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
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import { EditIcon, LogoutIcon, PasswordIcon } from "../components/SVG";
import { metalTypes } from "../constants";

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
      <section className="w-full text-center">
        <h1 className="text-4xl">Account</h1>
        <TabGroup className="max-w-2xl mx-auto">
          <TabList className="space-x-6 sm:space-x-8 xl:space-x-10 mt-10 border-b border-border-secondary">
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={`text-base pb-2 ${
                    hover ? "text-background-primary" : ""
                  } ${
                    selected
                      ? "text-background-primary border-b-2 border-solid border-background-primary"
                      : ""
                  }`}
                >
                  Account Information
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ hover, selected }) => (
                <button
                  className={`text-base pb-2 ${
                    hover ? "text-background-primary" : ""
                  } ${
                    selected
                      ? "text-background-primary border-b-2 border-solid border-background-primary"
                      : ""
                  }`}
                >
                  Purchase History
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div>
                <div className="flex justify-end gap-4 py-4">
                  <ButtonTag
                    onClick={() => setEditMode(!editMode)}
                    className="px-2 py-1 w-fit flex items-center gap-2"
                  >
                    <EditIcon
                      width={24}
                      height={24}
                      className="fill-text-primary hidden sm:block"
                    />
                    {editMode ? "Cancel edit" : "Edit"}
                  </ButtonTag>
                  <ButtonTag
                    onClick={() => setIsOpened(true)}
                    className="px-2 py-1 w-fit flex items-center gap-2"
                  >
                    <PasswordIcon
                      width={18}
                      height={18}
                      className="fill-text-primary hidden sm:block"
                    />
                    Change password
                  </ButtonTag>
                  <ButtonTag
                    onClick={() => dispatch(logout())}
                    className="px-2 py-1 w-fit flex items-center gap-2"
                  >
                    <LogoutIcon
                      width={20}
                      height={20}
                      className="fill-text-primary hidden sm:block"
                    />
                    Logout
                  </ButtonTag>
                </div>
                {editMode && (
                  <p className="mb-4 mt-2 text-sm">
                    * indicates a required field
                  </p>
                )}
                <div className="text-center border border-border-secondary">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 text-sm text-text-secondary"
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
                        <label htmlFor="lastName">
                          Last name{editMode && "*"}
                        </label>
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
                        Update information
                      </ButtonTag>
                    )}
                  </form>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="pt-8">
              <div className="text-center border border-border-secondary">
                <ul role="list" className="">
                  {orders && orders.length > 0 ? (
                    [...orders].reverse().map((item) => (
                      <li
                        key={item._id}
                        className="border-t border-border-secondary first:border-t-0"
                      >
                        <div className="px-5 pt-5 grid grid-cols-2 gap-1 text-left text-sm text-text-primary">
                          <div>
                            <span className="font-SofiaBold">Status:</span>{" "}
                            {item.status}
                          </div>
                          <div>
                            <span className="font-SofiaBold">
                              Order number:
                            </span>{" "}
                            {item.orderNumber}
                          </div>
                          <div>
                            <span className="font-SofiaBold">Date:</span>{" "}
                            {moment(item.createdAt).format("ll")}{" "}
                          </div>
                          <div>
                            <span className="font-SofiaBold">Total:</span>{" "}
                            {item.cartItems.reduce((total, item) => {
                              return (
                                total +
                                (item.salePrice || item.price) * item.quantity
                              );
                            }, 0)}{" "}
                            USD
                          </div>
                          {item.notes && <div>Notes: {item.notes}</div>}
                        </div>
                        {item.cartItems.map((cartItem) => (
                          <li
                            key={cartItem._id}
                            className="mx-5 py-5 [&:not(:last-child)]:border-b border-border-tertiary flex items-center"
                          >
                            <div className="w-24">
                              <a
                                href={`/products/${cartItem.productId}`}
                                tabIndex={-1}
                              >
                                <img
                                  src={cartItem.imageUrl}
                                  alt={cartItem.name}
                                  className="border border-border-primary/15"
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
                                {metalTypes[cartItem.metal]}
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
                      <ButtonTag
                        onClick={() => (window.location.href = "/all-jewelry")}
                      >
                        Shopping now
                      </ButtonTag>
                    </div>
                  )}
                </ul>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>
      <ChangePasswordModal isOpened={isOpened} setIsOpened={setIsOpened} />
    </>
  );
}

export default Account;
