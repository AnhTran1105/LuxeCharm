import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../redux/cartModal/cartModalSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import { AccountIcon, CartIcon, HeaderLogo, MenuIcon, SearchIcon } from "./SVG";
import AnchorTag from "./CustomTags/AnchorTag";
import HeaderMenu from "./HeaderMenu";
import { openSearchModal } from "../redux/searchModal/searchModalSlice";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const dispatch = useDispatch();

  const isLoggedIn = !!useSelector((state) => state.auth.token);
  const { items } = useSelector((item) => item.cart);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`border-b border-border-tertiary bg-white z-[9999] w-full ${
        isAtTop ? "relative" : "sticky top-0 left-0 right-0"
      } transition-transform duration-300 ease-out ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="px-4 md:px-8 lg:px-12 py-2 grid grid-cols-3">
        <ButtonTag
          onClick={() => dispatch(openSearchModal())}
          buttonType="icon"
          className="p-0 h-full max-lg:hidden"
        >
          <SearchIcon width={20} height={20} />
        </ButtonTag>
        <ButtonTag
          onClick={() => setIsOpened(!isOpened)}
          buttonType="icon"
          className="p-0 w-fit h-full lg:hidden"
        >
          <MenuIcon width={20} height={20} />
        </ButtonTag>
        <HeaderMenu isOpened={isOpened} setIsOpened={setIsOpened} />
        <AnchorTag href="/" className="flex justify-center">
          <HeaderLogo
            width={90}
            height={36}
            className={`${
              isAtTop && "w-[180px]"
            } transition-[width] duration-300 ease`}
          />
        </AnchorTag>
        <div className="flex justify-end items-center gap-6 max-md:gap-4">
          <ButtonTag
            onClick={() => dispatch(openSearchModal())}
            buttonType="icon"
            className="p-0 h-full lg:hidden"
          >
            <SearchIcon width={20} height={20} />
          </ButtonTag>
          <AnchorTag
            href={`${isLoggedIn ? "/account" : "/account/login"}`}
            className="p-0 flex items-center h-full group max-md:hidden"
          >
            <AccountIcon width={20} height={20} />
          </AnchorTag>
          <ButtonTag
            onClick={() => dispatch(showCart())}
            buttonType="icon"
            className="p-0 h-full relative"
          >
            <CartIcon width={20} height={20} />
            {items.length > 0 && (
              <div className="absolute top-4 -right-2 bg-background-primary rounded-full text-white w-4 h-4 text-center leading-[1.05rem] text-[0.6rem]">
                {items.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)}
              </div>
            )}
          </ButtonTag>
        </div>
        <ul
          role="list"
          className="col-span-3 mt-3 flex justify-center text-sm max-lg:hidden"
        >
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/all-jewelry"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              All Jewelry
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/jewelry/necklaces"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Necklaces
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/jewelry/earrings"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Earrings
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/jewelry/rings"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Rings
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/jewelry/bracelets"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Bracelets
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/jewelry/charms"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Charms
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
