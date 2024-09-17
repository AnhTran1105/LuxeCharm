import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { sendMessage } from "../redux/notification/notificationSlice";
import { useState } from "react";
import AnchorTag from "../components/CustomTags/AnchorTag";
import ButtonTag from "../components/CustomTags/ButtonTag";
import ErrorMessage from "../components/ErrorMessage";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords must match"),
    address: yup.string().required(),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formData) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });
      dispatch(
        sendMessage({
          message: response.message,
          type: "success",
        })
      );
      navigate("/account/login");
    } catch (error) {
      dispatch(sendMessage({ message: error.message, type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Create account</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 text-sm text-text-secondary"
          >
            <p className="my-[10px]">* indicates a required field</p>
            <div className="field">
              <input
                id="firstName"
                autoComplete="firstName"
                autoCapitalize="off"
                placeholder="firstName"
                autoCorrect="off"
                {...register("firstName")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
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
                autoCapitalize="off"
                placeholder="lastName"
                autoCorrect="off"
                {...register("lastName")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
              />
              <label htmlFor="lastName">Last name*</label>
            </div>
            {errors.lastName && (
              <ErrorMessage message={errors.lastName?.message} />
            )}
            <div className="field">
              <input
                id="address"
                autoComplete="address"
                autoCapitalize="off"
                placeholder="address"
                autoCorrect="off"
                {...register("address")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
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
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-text-primary"
              />
              <label htmlFor="phoneNumber">Phone number*</label>
            </div>
            {errors.phoneNumber && (
              <ErrorMessage message={errors.phoneNumber?.message} />
            )}
            <div className="field">
              <input
                id="email"
                autoComplete="email"
                required
                autoCapitalize="off"
                placeholder="Email"
                autoCorrect="off"
                {...register("email")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
              />
              <label htmlFor="email">Email*</label>
            </div>
            {errors.email && <ErrorMessage message={errors.email?.message} />}
            <div className="field">
              <input
                id="password"
                autoComplete="password"
                required
                type="password"
                autoCapitalize="off"
                placeholder="Password"
                autoCorrect="off"
                {...register("password")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
              />
              <label htmlFor="password">Password*</label>
            </div>
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
            <div className="field relative">
              <input
                id="passwordConfirmation"
                autoComplete="passwordConfirmation"
                required
                type={isVisible ? "text" : "password"}
                autoCapitalize="off"
                placeholder="passwordConfirmation"
                autoCorrect="off"
                {...register("passwordConfirmation")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-primary"
              />
              <label htmlFor="passwordConfirmation">Confirm password*</label>
              <button
                type="button"
                className="absolute top-3 right-[15px]"
                onClick={() => setVisible(!isVisible)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="eye-closed"
                  className={`${isVisible && "rotate-180"}`}
                  width={24}
                  height={24}
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <line
                    x1="201.15"
                    x2="223.96"
                    y1="127.305"
                    y2="166.813"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <line
                    x1="154.182"
                    x2="161.296"
                    y1="149.263"
                    y2="189.607"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <line
                    x1="101.73"
                    x2="94.615"
                    y1="149.244"
                    y2="189.594"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <line
                    x1="54.809"
                    x2="31.889"
                    y1="127.272"
                    y2="166.971"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  ></line>
                  <path
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                    d="M31.99943,104.87509C48.81193,125.68556,79.63353,152,128,152c48.36629,0,79.18784-26.31424,96.00039-47.12468"
                  ></path>
                </svg>
              </button>
            </div>
            {errors.passwordConfirmation && (
              <ErrorMessage message={errors.passwordConfirmation?.message} />
            )}
            <ButtonTag type="submit" className="mt-5">
              Create account
            </ButtonTag>
            <div className="flex justify-center items-center gap-1 mt-3">
              Already have an account?
              <AnchorTag href="/account/login" type="underline">
                Login now
              </AnchorTag>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
