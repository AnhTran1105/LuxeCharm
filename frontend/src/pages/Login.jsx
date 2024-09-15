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
import LinkTag from "../components/CustomTags/LinkTag";

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
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Login</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 text-sm text-text-secondary"
          >
            <p className="my-[10px]">* indicates a required field</p>
            <div className="field">
              <input
                id="email"
                autoComplete="email"
                required
                autoCapitalize="off"
                placeholder="Email"
                autoCorrect="off"
                {...register("email")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-secondary"
              />
              <label htmlFor="email">Email*</label>
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
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-text-secondary"
              />
              <label htmlFor="password">Password*</label>
            </div>
            {errors.password && (
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
                  {errors.password?.message}
                </span>
              </p>
            )}
            <div className="text-left">
              <LinkTag to="/password/recover" type="underline" className="mt-3">
                Forgot your password?
              </LinkTag>
            </div>
            <ButtonTag className="my-5" type="submit">
              Login now
            </ButtonTag>
            <OAuth />
            <LinkTag to="/account/register" type="underline" className="mt-3">
              Create account
            </LinkTag>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
