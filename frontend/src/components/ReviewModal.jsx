import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { sendMessage } from "../redux/notification/notificationSlice";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

const schema = yup
  .object({
    content: yup.string().required(),
  })
  .required();
const tooltipArray = ["Terrible", "Bad", "Average", "Great", "Awesome"];

function ReviewModal({ isOpened, setOpened, productId }) {
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
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

    data.append("rating", rating);
    data.append("content", formData.content);

    (async () => {
      try {
        const response = await axios.post(`reviews/${productId}`, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        dispatch(stopLoading());
        dispatch(sendMessage({ message: response.message, type: "success" }));
      } catch (error) {
        dispatch(stopLoading());
        dispatch(sendMessage({ message: error.message, type: "error" }));
      }
    })();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={() => setOpened(false)}
      className="relative z-[9999]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 duration-100 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-[500px] space-y-4 bg-white p-6 duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="font-bold text-center uppercase font-SofiaBold text-sm leading-[30px] relative">
            Share your thoughts
            <button
              onClick={() => setOpened(false)}
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
          <div className="flex items-center gap-3">
            Rate your experience:
            <Rating
              transition={true}
              size={24}
              onClick={handleRating}
              initialValue={rating}
              fillColor="#a16854"
              SVGclassName={`inline-block`}
              showTooltip
              tooltipArray={tooltipArray}
              tooltipDefaultText=""
              tooltipClassName="!bg-white !text-color-foreground !p-0 mt-1"
            />
          </div>
          <div className="field">
            <textarea
              rows="4"
              id="content"
              autoComplete="content"
              required
              autoCapitalize="off"
              placeholder="content"
              autoCorrect="off"
              {...register("content")}
              className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
            />
            <label htmlFor="content">Your thoughts*</label>
          </div>
          {errors.content && (
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
                {errors.content?.message}
              </span>
            </p>
          )}
          <Button
            title="Write a review"
            onClick={handleSubmit(onSubmit)}
            className="h-auto py-2"
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ReviewModal;
