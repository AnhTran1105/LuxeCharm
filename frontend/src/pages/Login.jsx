import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { setToken } from "../redux/auth/authSlice";
import { sendMessage } from "../redux/notification/notificationSlice";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { setIsLoggedIn, syncCartAfterLogin } from "../redux/cart/cartSlice";
import ButtonTag from "../components/CustomTags/ButtonTag";
import AnchorTag from "../components/CustomTags/AnchorTag";
import ErrorMessage from "../components/ErrorMessage";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { access_token } = response;
      dispatch(setToken(access_token));
      dispatch(setIsLoggedIn(true));
      dispatch(syncCartAfterLogin());
      dispatch(sendMessage({ message: response.message, type: "success" }));
      navigate("/");
    } catch (error) {
      dispatch(sendMessage({ message: error.message, type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="w-full max-w-[440px] text-center mx-auto">
      <h1 className="text-[40px]">Login</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 text-sm text-text-secondary"
        >
          <p className="my-3">* indicates a required field</p>
          <div className="field">
            <input
              id="email"
              autoComplete="email"
              required
              type="email"
              autoCapitalize="off"
              placeholder="Email"
              autoCorrect="off"
              {...register("email")}
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-secondary"
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
              className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative text-text-secondary"
            />
            <label htmlFor="password">Password*</label>
          </div>
          {errors.password && (
            <ErrorMessage message={errors.password?.message} />
          )}
          <div className="text-left">
            <AnchorTag
              href="/password/recover"
              type="underline"
              className="mt-3"
            >
              Forgot your password?
            </AnchorTag>
          </div>
          <ButtonTag className="my-5" type="submit">
            Login now
          </ButtonTag>
          <OAuth />
          <AnchorTag href="/account/register" type="underline" className="mt-3">
            Create account
          </AnchorTag>
        </form>
      </div>
    </div>
  );
}

export default Login;
