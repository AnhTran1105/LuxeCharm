import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    (async () => {
      try {
        dispatch(signInStart());
        const response = await axios.post("auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.data.success === false) {
          dispatch(signInFailure(response.data.message));
          return;
        }
        dispatch(signInSuccess(response.data));
        navigate("/");
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.response.data.message));
      }
    })();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Login</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 text-sm text-color-foreground/75"
          >
            <p className="my-[10px]">* indicates a required field</p>
            {error && (
              <div className="min-w-[446px] min-h-[45px] border border-red flex justify-center items-center text-red">
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
                {error}
              </div>
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
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
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
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
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
            <a
              className="!text-sm text-left link mt-[10px] underline hover:decoration-2 w-fit"
              href="/password/recover"
            >
              Forgot your password?
            </a>
            <button
              type="submit"
              disabled={loading}
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-10 mb-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
            >
              {loading ? <Loading loading={true} /> : <span>Log in</span>}
            </button>

            <div className="flex justify-center">
              <a
                className="!text-sm link underline hover:decoration-2 w-fit"
                href="/account/register"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
