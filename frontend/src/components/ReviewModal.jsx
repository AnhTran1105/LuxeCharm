import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";

function ReviewModal({ isOpened, setOpened }) {
  return (
    <Dialog
      open={isOpened}
      onClose={() => setOpened(false)}
      className="relative z-[9999]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <DialogPanel
        transition
        className="w-[500px] max-w-[calc(100%-20px)] m-[10px] rounded-2xl bg-white overflow-hidden transition duration-100 ease-out data-[closed]:opacity-0"
      >
        <DialogTitle className="font-bold border-b border-border py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
          Share your thoughts
        </DialogTitle>
        <button
          onClick={() => setOpened(false)}
          className="absolute top-[10px] right-[10px] p-1 group"
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
        <Button title="Submit" className="h-auto py-2" />
      </DialogPanel>
    </Dialog>
  );
}

export default ReviewModal;
