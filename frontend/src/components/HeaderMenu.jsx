import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import LinkTag from "./CustomTags/LinkTag";
import { CloseIcon, TrashIcon } from "./SVG";

function HeaderMenu({ isOpened, setIsOpened }) {
  return (
    isOpened && (
      <Dialog
        open={isOpened}
        onClose={() => setIsOpened(false)}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <DialogPanel
          transition
          className="fixed w-[500px] max-w-[calc(100%-20px)] top-0 right-0 bottom-0 m-[10px] rounded-2xl bg-white overflow-hidden transition duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogTitle className="border-b border-border-primary/15 py-[10px] px-5 text-center uppercase font-SofiaBold text-sm leading-[30px]">
            Your cart
          </DialogTitle>
          <ButtonTag
            onClick={() => setIsOpened(false)}
            buttonType="icon"
            className="absolute top-[10px] right-[10px] group"
          >
            <CloseIcon width={20} height={20} />
          </ButtonTag>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default HeaderMenu;
