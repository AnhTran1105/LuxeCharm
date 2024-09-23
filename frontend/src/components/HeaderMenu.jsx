import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ButtonTag from "./CustomTags/ButtonTag";
import { NavLink } from "react-router-dom";
import { CloseIcon, AccountIcon } from "./SVG";
import AnchorTag from "./CustomTags/AnchorTag";
import { useState, useEffect } from "react";
import axios from "../utils/axios";

function HeaderMenu({ isOpened, setIsOpened }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/users/my-account", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
          className={`fixed sm:w-2/5 md:w-1/2 w-3/5 top-0 left-0 bottom-0 bg-white overflow-hidden transform transition-transform duration-300 ease 
         ${isOpened ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ButtonTag
            onClick={() => setIsOpened(false)}
            buttonType="icon"
            className="absolute top-2 right-2 group"
          >
            <CloseIcon width={24} height={24} />
          </ButtonTag>
          <AnchorTag
            href={`${userInfo ? "/account" : "/account/login"}`}
            className="p-0 flex items-center group pt-12 pb-6 px-6 gap-2 text-sm border-b border-border-tertiary md:hidden"
          >
            <AccountIcon width={20} height={20} />
            {userInfo ? userInfo.email : "Login"}
          </AnchorTag>
          <nav className="md:my-12 my-6">
            <NavLink
              reloadDocument={true}
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
            <NavLink
              reloadDocument={true}
              to="/jewelry/necklaces"
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
              reloadDocument={true}
              to="/jewelry/earrings"
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
              reloadDocument={true}
              to="/jewelry/rings"
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
              reloadDocument={true}
              to="/jewelry/bracelets"
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
              reloadDocument={true}
              to="/jewelry/charms"
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
          </nav>
        </DialogPanel>
      </Dialog>
    )
  );
}

export default HeaderMenu;
