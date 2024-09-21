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
import { sendMessage } from "../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import ErrorMessage from "./ErrorMessage";

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
            className="w-full sm:w-2/3 lg:w-1/2 overflow-y-scroll bg-white p-4 lg:p-6 duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-center uppercase font-SofiaBold text-sm leading-7 relative">
              Change Password
              <button
                onClick={() => setIsOpened(false)}
                className="absolute -top-3 -right-3 p-1 group"
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-color-foreground"
                />
                <label htmlFor="currentPassword">Current password*</label>
              </div>
              {errors.currentPassword && (
                <ErrorMessage message={errors.currentPassword?.message} />
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
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-color-foreground"
                />
                <label htmlFor="newPassword">New password*</label>
              </div>
              {errors.newPassword && (
                <ErrorMessage message={errors.newPassword?.message} />
              )}
              <div className="field relative">
                <input
                  id="newPasswordConfirmation"
                  autoComplete="newPasswordConfirmation"
                  required
                  autoCapitalize="off"
                  placeholder="newPasswordConfirmation"
                  autoCorrect="off"
                  {...register("newPasswordConfirmation")}
                  className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] text-base text-color-foreground"
                />
                <label htmlFor="newPasswordConfirmation">
                  Confirm password*
                </label>
              </div>
              {errors.newPasswordConfirmation && (
                <ErrorMessage
                  message={errors.newPasswordConfirmation?.message}
                />
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
