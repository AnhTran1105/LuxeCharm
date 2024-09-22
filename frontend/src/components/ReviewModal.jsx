import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { startLoading, stopLoading } from "../redux/loading/loadingSlice";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { sendMessage } from "../redux/notification/notificationSlice";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import ButtonTag from "./CustomTags/ButtonTag";
import { CloseIcon } from "./SVG";
import ErrorMessage from "./ErrorMessage";

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
  const [isRefresh, setIsRefresh] = useState(false);
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
        await axios.post(`reviews/${productId}`, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        dispatch(stopLoading());
        setOpened(false);
        setIsRefresh(!isRefresh);
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
          <DialogTitle className="text-center uppercase font-SofiaBold text-sm leading-[30px] relative">
            Share your thoughts
            <button
              onClick={() => setOpened(false)}
              className="absolute -top-4 -right-4 p-1 group"
            >
              <CloseIcon width={20} height={20} />
            </button>
          </DialogTitle>
          <div className="sm:flex items-center gap-3">
            <div>Rate your experience:</div>
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
              <label htmlFor="content">Your thoughts*</label>
            </div>
            {errors.content && (
              <ErrorMessage message={errors.content?.message} />
            )}
            <ButtonTag type="submit">Write a review</ButtonTag>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ReviewModal;
