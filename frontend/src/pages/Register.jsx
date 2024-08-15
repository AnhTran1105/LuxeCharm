import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Create account</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 text-sm text-color-foreground/75"
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
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="firstName">First name</label>
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

                <span className="first-letter:capitalize flex">
                  {errors.firstName?.message}
                </span>
              </p>
            )}
            <div className="field">
              <input
                id="lastName"
                autoComplete="lastName"
                autoCapitalize="off"
                placeholder="lastName"
                autoCorrect="off"
                {...register("lastName")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="lastName">Last name</label>
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

                <span className="first-letter:capitalize flex">
                  {errors.lastName?.message}
                </span>
              </p>
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

                <span className="first-letter:capitalize flex">
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

                <span className="first-letter:capitalize flex">
                  {errors.password?.message}
                </span>
              </p>
            )}
            <button
              type="submit
            "
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-10 mb-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)]"
            >
              <span>Create</span>
            </button>

            <div className="flex justify-center items-center gap-1">
              Already have an account?
              <a
                className="!text-sm link underline hover:decoration-2 w-fit"
                href="/account/login"
              >
                Login now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
