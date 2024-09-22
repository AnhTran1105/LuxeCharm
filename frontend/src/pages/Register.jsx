import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { useState } from "react";
import AnchorTag from "../components/CustomTags/AnchorTag";
import ButtonTag from "../components/CustomTags/ButtonTag";
import ErrorMessage from "../components/ErrorMessage";
import { EyeIcon } from "../components/SVG";
import { WarningIcon } from "../components/SVG";

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      await axios.post("auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });
      window.location.href = "/account/login";
    } catch (error) {
      dispatch(stopLoading());
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-[440px] text-center mx-auto">
      <h1 className="text-4xl">Register</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 text-sm text-text-secondary"
        >
          <p className="my-3">* indicates a required field</p>
          {errorMessage && (
            <p className="text-left pb-2 flex items-center">
              <WarningIcon width={20} height={20} />
              <span className="first-letter:capitalize">{errorMessage}</span>
            </p>
          )}
          <div className="double-field">
            <div>
              <div className="field">
                <input
                  id="firstName"
                  autoComplete="firstName"
                  autoCapitalize="off"
                  placeholder="firstName"
                  autoCorrect="off"
                  {...register("firstName")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
                />
                <label htmlFor="firstName">First name*</label>
              </div>
              {errors.firstName && (
                <ErrorMessage message={errors.firstName?.message} />
              )}
            </div>
            <div>
              <div className="field">
                <input
                  id="lastName"
                  autoComplete="lastName"
                  autoCapitalize="off"
                  placeholder="lastName"
                  autoCorrect="off"
                  {...register("lastName")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
                />
                <label htmlFor="lastName">Last name*</label>
              </div>
              {errors.lastName && (
                <ErrorMessage message={errors.lastName?.message} />
              )}
            </div>
          </div>
          <div className="field">
            <input
              id="address"
              autoComplete="address"
              autoCapitalize="off"
              placeholder="address"
              autoCorrect="off"
              {...register("address")}
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
            />
            <label htmlFor="address">Address*</label>
          </div>
          {errors.address && <ErrorMessage message={errors.address?.message} />}
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
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
            />
            <label htmlFor="email">Email*</label>
          </div>
          {errors.email && <ErrorMessage message={errors.email?.message} />}
          <div className="field">
            <input
              id="password"
              autoComplete="password"
              required
              type={passwordVisible ? "text" : "password"}
              autoCapitalize="off"
              placeholder="Password"
              autoCorrect="off"
              {...register("password")}
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
            />
            <label htmlFor="password">Password*</label>
            <button
              type="button"
              className="absolute top-3 right-[15px]"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <EyeIcon
                width={24}
                height={24}
                className={`${passwordVisible ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {errors.password && (
            <ErrorMessage message={errors.password?.message} />
          )}
          <div className="field relative">
            <input
              id="passwordConfirmation"
              autoComplete="passwordConfirmation"
              required
              type={confirmPasswordVisible ? "text" : "password"}
              autoCapitalize="off"
              placeholder="passwordConfirmation"
              autoCorrect="off"
              {...register("passwordConfirmation")}
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-primary"
            />
            <label htmlFor="passwordConfirmation">Confirm password*</label>
            <button
              type="button"
              className="absolute top-3 right-[15px]"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <EyeIcon
                width={24}
                height={24}
                className={`${confirmPasswordVisible ? "rotate-180" : ""}`}
              />
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
  );
}

export default Register;
