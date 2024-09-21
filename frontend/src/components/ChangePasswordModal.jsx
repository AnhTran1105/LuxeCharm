import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import ButtonTag from "./CustomTags/ButtonTag";

const schema = yup
  .object({
    currentPassword: yup.string().required().min(6),
    newPassword: yup.string().required().min(6),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "passwords must match"),
  })
  .required();

function ChangePasswordModal({ isOpened, setIsOpened }) {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    dispatch(startLoading());
    const data = new FormData();

    data.append("currentPassword", formData.currentPassword);
    data.append("newPassword", formData.newPassword);

    (async () => {
      try {
        const response = await axios.put("/users/change-password", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        dispatch(sendMessage({ message: response.message, type: "success" }));
        setIsOpened(false);
      } catch (error) {
        dispatch(sendMessage({ message: error.message, type: "error" }));
      } finally {
        dispatch(stopLoading());
      }
    })();
  };

  return (
    isOpened && (
      <Dialog
        open={isOpened}
        onClose={() => setIsOpened(false)}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70 duration-100 ease-out data-[closed]:opacity-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className=" overflow-y-scroll bg-white p-6 duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="font-bold text-center uppercase font-SofiaBold text-sm leading-[30px] relative">
              Change Password
              <button
                onClick={() => setIsOpened(false)}
                className="absolute -top-4 -right-4 p-1 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                  id="close"
                >
                  <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </button>
            </DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 text-sm text-color-foreground/75"
            >
              <div className="field">
                <input
                  id="currentPassword"
                  autoComplete="currentPassword"
                  required
                  type="password"
                  autoCapitalize="off"
                  placeholder="currentPassword"
                  autoCorrect="off"
                  {...register("currentPassword")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="currentPassword">Current password*</label>
              </div>
              {errors.currentPassword && (
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
                    {errors.currentPassword?.message}
                  </span>
                </p>
              )}
              <div className="field">
                <input
                  id="newPassword"
                  autoComplete="newPassword"
                  required
                  type="password"
                  autoCapitalize="off"
                  placeholder="newPassword"
                  autoCorrect="off"
                  {...register("newPassword")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="newPassword">New password*</label>
              </div>
              {errors.newPassword && (
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
                    {errors.newPassword?.message}
                  </span>
                </p>
              )}
              <div className="field relative">
                <input
                  id="newPasswordConfirmation"
                  autoComplete="newPasswordConfirmation"
                  required
                  type={isVisible ? "text" : "password"}
                  autoCapitalize="off"
                  placeholder="newPasswordConfirmation"
                  autoCorrect="off"
                  {...register("newPasswordConfirmation")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-w-[446px] min-h-[45px] text-base text-color-foreground"
                />
                <label htmlFor="newPasswordConfirmation">
                  Confirm password*
                </label>
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
              {errors.newPasswordConfirmation && (
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
                    {errors.newPasswordConfirmation?.message}
                  </span>
                </p>
              )}
              <ButtonTag type="submit" className="mt-5">
                Change password
              </ButtonTag>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    )
  );
}

export default ChangePasswordModal;
