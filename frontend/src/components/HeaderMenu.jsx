import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import { NavLink } from "react-router-dom";
import { CloseIcon, AccountIcon } from "./SVG";
import LinkTag from "./CustomTags/LinkTag";

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
          className={`fixed md:w-2/5 w-3/5 top-0 left-0 bottom-0 bg-white overflow-hidden transform transition-transform duration-300 ease 
         ${isOpened ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ButtonTag
            onClick={() => setIsOpened(false)}
            buttonType="icon"
            className="absolute top-2 right-2 group"
          >
            <CloseIcon width={24} height={24} />
          </ButtonTag>
          <LinkTag
            to="/account"
            className="p-0 flex items-center group pt-12 pb-6 px-6 gap-2 text-base border-b border-border-tertiary md:hidden"
          >
            <AccountIcon width={20} height={20} />
            Login
          </LinkTag>
          <nav className="md:my-12 my-6">
            <NavLink
              to="/best-sellers"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Best Sellers
            </NavLink>
            <NavLink
              to="/necklaces"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Necklaces
            </NavLink>
            <NavLink
              to="/earrings"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Earrings
            </NavLink>
            <NavLink
              to="/rings"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Rings
            </NavLink>
            <NavLink
              to="/bracelets"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Bracelets
            </NavLink>
            <NavLink
              to="/charms"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              Charms
            </NavLink>
            <NavLink
              to="/all-jewelry"
              className={({ isActive }) =>
                `w-full block px-6 py-3 ${
                  isActive
                    ? "text-white bg-background-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                }`
              }
            >
              All Jewelry
            </NavLink>
          </nav>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default HeaderMenu;
