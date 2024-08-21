import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../redux/modal/modalSlice.js";
import Button from "./Button.jsx";

function ConfirmModal({ title, description, isOpen, setIsOpen, onSubmit }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) dispatch(openModal());
    else dispatch(closeModal());
  }, [isOpen, dispatch]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="relative z-50 text-center"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white py-6 px-8 relative shadow-sm">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                id="close"
              >
                <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </button>
            <DialogTitle className="font-bold font-SofiaBold text-lg !mt-0">
              {title}
            </DialogTitle>
            <Description className="!my-6">{description}</Description>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setIsOpen(false)}
                content="No"
                className="w-20"
              />
              <Button
                onClick={() => {
                  onSubmit();
                  setIsOpen(false);
                }}
                content="Yes"
                className="w-20 hover:bg-red hover:border-red hover:text-white"
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ConfirmModal;
