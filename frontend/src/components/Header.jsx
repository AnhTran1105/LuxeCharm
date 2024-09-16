import { NavLink } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Logo from "../assets/images/LuxuryCharming.png";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../redux/cartModal/cartModalSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import { AccountIcon, CartIcon, HeaderLogo, MenuIcon, SearchIcon } from "./SVG";
import LinkTag from "./CustomTags/LinkTag";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
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

  useEffect(() => {
    if (
      [jewelryMenuRef, beautyMenuRef, lifestyleMenuRef].some(
        (ref) => ref.current && !ref.current.classList.contains("opacity-0")
      )
    ) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  }, [menuToggle]);

  const headerRef = useRef();
  const jewelryMenuRef = useRef();
  const beautyMenuRef = useRef();
  const lifestyleMenuRef = useRef();

  const jewelryIconRef = useRef();
  const beautyIconRef = useRef();
  const lifestyleIconRef = useRef();

  const toggleMenu = (menuRef, iconRef) => {
    setMenuToggle(!menuToggle);
    [jewelryMenuRef, beautyMenuRef, lifestyleMenuRef]
      .filter((ref) => ref !== menuRef)
      .forEach((ref) => {
        if (ref.current && !ref.current.classList.contains("opacity-0")) {
          ref.current.classList.add("opacity-0");
          ref.current.classList.add("invisible");
        }
      });

    [jewelryIconRef, beautyIconRef, lifestyleIconRef]
      .filter((ref) => ref !== iconRef)
      .forEach((ref) => {
        ref.current.classList.remove("rotate-180");
      });

    menuRef.current.classList.toggle("opacity-0");
    menuRef.current.classList.toggle("invisible");
    iconRef.current.classList.toggle("rotate-180");
  };

  return (
    <header
      className={`border-b border-border-tertiary bg-white z-[9999] w-full ${
        isAtTop ? "relative" : "fixed top-0 left-0 right-0"
      }`}
    >
      <div className="px-4 md:px-8 lg:px-12 py-2 grid grid-cols-3">
        <ButtonTag
          onClick={() => {}}
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
        <LinkTag to="/" className="flex justify-center">
          <HeaderLogo
            width={90}
            height={36}
            className={`${
              isAtTop && "w-[180px]"
            } transition-[width] duration-300 ease`}
          />
        </LinkTag>
        <div className="flex justify-end items-center gap-6 max-md:gap-4">
          <ButtonTag
            onClick={() => {}}
            buttonType="icon"
            className="p-0 h-full lg:hidden"
          >
            <SearchIcon width={20} height={20} />
          </ButtonTag>
          <LinkTag
            to="/account"
            className="p-0 flex items-center h-full group max-md:hidden"
          >
            <AccountIcon width={20} height={20} />
          </LinkTag>
          <ButtonTag
            onClick={() => dispatch(showCart())}
            buttonType="icon"
            className="p-0 h-full"
          >
            <CartIcon width={20} height={20} />
          </ButtonTag>
        </div>
        <ul
          role="list"
          className="col-span-3 mt-3 flex justify-center text-sm max-lg:hidden"
        >
          <li className="p-3">
            <NavLink
              to="/best-sellers"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Best Sellers
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              to="/necklaces"
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
              to="/earrings"
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
              to="/rings"
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
              to="/bracelets"
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
              to="/charms"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Charms
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
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
        </ul>
      </div>
    </header>
    // <header
    //   className={`border-b-[1px] bg-white z-[9999] border-border-tertiary ${
    //     isAtTop ? "relative" : "fixed top-0 left-0"
    //   } w-full transition-transform duration-300 ease-out ${
    //     isVisible
    //       ? "transform translate-y-0"
    //       : isMenuOpened
    //       ? "transform -translate-y-[calc(100%+262px)]"
    //       : "transform -translate-y-full"
    //   }`}
    // >
    //   <div
    //     ref={headerRef}
    //     className="py-2 px-[50px] grid grid-cols-4 items-center text-[14px]"
    //   >
    //     <div className="h-[44px] w-[44px] flex items-center p-0 col-span-1 group cursor-pointer">
    //       <span className="flex justify-start">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 512 512"
    //           id="search"
    //           className="h-[20px] w-[20px] group-hover:scale-[1.07]"
    //         >
    //           <g>
    //             <path d="M359,344.9a170.577,170.577,0,0,0,43.4-113.8c0-94.5-76.9-171.3-171.3-171.3-94.5,0-171.3,76.9-171.3,171.3s76.9,171.3,171.3,171.3A170.577,170.577,0,0,0,344.9,359l90.3,90.3a9.82,9.82,0,0,0,7.1,2.9,10.243,10.243,0,0,0,7.1-2.9,9.959,9.959,0,0,0,0-14.1ZM79.7,231.1c0-83.4,67.9-151.3,151.3-151.3s151.3,67.9,151.3,151.3S314.4,382.4,231,382.4,79.7,314.5,79.7,231.1Z"></path>
    //           </g>
    //         </svg>
    //       </span>
    //     </div>
    //     <h1 className="col-span-2 justify-self-center">
    //       <a href="/" className="p-[7.5px] pb-0 flex items-center">
    //         <img
    //           src={Logo}
    //           alt="LuxeCharm Homepage"
    //           className={`${
    //             isAtTop ? "w-[140px]" : "w-[100px]"
    //           } transition-[width] duration-300 ease`}
    //         />
    //       </a>
    //     </h1>
    //     <div className="col-span-1 justify-self-end flex">
    //       <a
    //         href={`${isLoggedIn ? "/account" : "/account/login"}`}
    //         className="h-[44px] w-[44px] flex items-center group cursor-pointer"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           aria-hidden="true"
    //           focusable="false"
    //           fill="none"
    //           viewBox="0 0 18 19"
    //           className="w-[20px] h-[20px] group-hover:scale-[1.07]"
    //         >
    //           <g>
    //             <circle
    //               cx="9"
    //               cy="4.3273"
    //               r="3.367"
    //               fill="none"
    //               stroke="#231f20"
    //               strokeMiterlimit="10"
    //             ></circle>
    //             <path
    //               d="M15.25,15.1109a6.25,6.25,0,0,0-12.5,0Z"
    //               fill="none"
    //               stroke="#231f20"
    //               strokeMiterlimit="10"
    //             ></path>
    //           </g>
    //         </svg>
    //       </a>
    //       <button
    //         onClick={() => dispatch(showCart())}
    //         className="h-[44px] w-[44px] flex items-center group cursor-pointer relative"
    //       >
    //         <svg
    //           className="group-hover:scale-[1.07]"
    //           x="0px"
    //           y="0px"
    //           width="20px"
    //           height="20px"
    //           viewBox="0.218 4.167 17.24 15.822"
    //           enableBackground="new 0.218 4.167 17.24 15.822"
    //           xmlSpace="preserve"
    //           aria-hidden="true"
    //           focusable="false"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //         >
    //           <g>
    //             <polyline
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               points="0.218,4.664 2.864,4.664 5.335,15.42 15.22,15.42 	"
    //             ></polyline>
    //             <polyline
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               points="3.321,6.655 16.856,6.655 15.429,13.262 4.906,13.262 	"
    //             ></polyline>
    //             <path
    //               fill="#231F20"
    //               d="M7.433,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785s-0.785-0.351-0.785-0.785l0,0
    // 		C6.648,17.771,7,17.419,7.433,17.419 M7.433,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
    // 		c0.986,0,1.785-0.799,1.785-1.785C9.217,17.219,8.418,16.421,7.433,16.419z"
    //             ></path>
    //             <path
    //               fill="#231F20"
    //               d="M13.37,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785c-0.433,0-0.785-0.351-0.785-0.785
    // 		l0,0C12.585,17.771,12.937,17.419,13.37,17.419 M13.37,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
    // 		c0.986,0,1.785-0.799,1.785-1.785C15.154,17.219,14.355,16.421,13.37,16.419z"
    //             ></path>
    //             <line
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               x1="4.091"
    //               y1="10.004"
    //               x2="16.133"
    //               y2="10.004"
    //             ></line>
    //             <line
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               x1="6.604"
    //               y1="6.655"
    //               x2="7.433"
    //               y2="13.262"
    //             ></line>
    //             <line
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               x1="10.291"
    //               y1="6.712"
    //               x2="10.291"
    //               y2="13.156"
    //             ></line>
    //             <line
    //               fill="none"
    //               stroke="#231F20"
    //               strokeMiterlimit="10"
    //               x1="14.009"
    //               y1="6.712"
    //               x2="12.731"
    //               y2="13.262"
    //             ></line>
    //           </g>
    //         </svg>
    //         {items.length > 0 && (
    //           <div className="absolute top-5 right-4 bg-[#f7f4f4] rounded-full text-color-foreground w-4 h-4 flex justify-center items-center text-[10px]">
    //             <span>
    //               {items.reduce((total, item) => {
    //                 return total + item.quantity;
    //               }, 0)}
    //             </span>
    //           </div>
    //         )}
    //       </button>
    //     </div>
    //     <nav className="col-span-2 col-start-2 mt-[10.5px]">
    //       <ul role="list" className="flex justify-center items-center">
    //         <li>
    //           <NavLink
    //             className={`header-nav-item text-color-foreground/75 hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]
    //               text-hover hover:text-hover`}
    //             to="/collections/bestsellers"
    //           >
    //             <span>Best Sellers</span>
    //           </NavLink>
    //         </li>

    //         <li
    //           className=""
    //           onClick={() => toggleMenu(jewelryMenuRef, jewelryIconRef)}
    //         >
    //           <button
    //             className={`header-nav-item !pr-[27px] text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] relative ${
    //               jewelryMenuRef.current &&
    //               !jewelryMenuRef.current.classList.contains("opacity-0") &&
    //               "underline underline-offset-[2.5px] hover:decoration-2"
    //             }`}
    //             // to="/collections/jewelry"
    //           >
    //             <span>Jewelry</span>
    //             <svg
    //               ref={jewelryIconRef}
    //               aria-hidden="true"
    //               focusable="false"
    //               viewBox="0 0 22 13"
    //               className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
    //             >
    //               <polyline
    //                 points="21.557 1.222 11 11.778 0.443 1.222"
    //                 fill="none"
    //                 stroke="#121212"
    //                 strokeMiterlimit="10"
    //               ></polyline>
    //             </svg>
    //           </button>
    //           <div
    //             className="invisible opacity-0 transition-opacity duration-100 ease-linear absolute left-0 right-0 bg-white top-[calc(100%+1px)]"
    //             ref={jewelryMenuRef}
    //             tabIndex="-1"
    //           >
    //             <div className="py-6 flex justify-center">
    //               <div className="px-10 grid grid-cols-3 gap-6 w-[48%]">
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Shop by Category
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Necklaces
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Earrings
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/rings">
    //                         Rings
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/bracelets">
    //                         Bracelets
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/charm-bar">
    //                         Charms
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Shop All
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Featured Collections
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Vermeil
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Silver Jewelry
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/rings">
    //                         Engravable Jewelry
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/bracelets">
    //                         Best Sellers
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/charm-bar">
    //                         Signature Sets
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Kristin's Style Edit
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Trending Collections
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Charms
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Colorful Jewelry
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/rings">
    //                         Layer Up Collection
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/bracelets">
    //                         Wedding Season Collection
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/charm-bar">
    //                         Just Add Sparkle
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </li>

    //         <li onClick={() => toggleMenu(beautyMenuRef, beautyIconRef)}>
    //           <button
    //             className={`header-nav-item !pr-[27px] text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] relative ${
    //               beautyMenuRef.current &&
    //               !beautyMenuRef.current.classList.contains("opacity-0") &&
    //               "underline underline-offset-[2.5px] hover:decoration-2"
    //             }`}
    //             // to="/collections/beauty"
    //           >
    //             <span>Beauty</span>
    //             <svg
    //               ref={beautyIconRef}
    //               className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
    //               aria-hidden="true"
    //               focusable="false"
    //               viewBox="0 0 22 13"
    //             >
    //               <polyline
    //                 points="21.557 1.222 11 11.778 0.443 1.222"
    //                 fill="none"
    //                 stroke="#121212"
    //                 strokeMiterlimit="10"
    //               ></polyline>
    //             </svg>
    //           </button>
    //           <div
    //             className="invisible opacity-0 transition-opacity duration-100 ease-linear absolute left-0 right-0 bg-white top-[calc(100%+1px)]"
    //             ref={beautyMenuRef}
    //             tabIndex="-1"
    //           >
    //             <div className="py-6 flex justify-center">
    //               <div className="px-10 grid grid-cols-2 gap-6 w-[32%]">
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Shop by Category
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Bundles and Duos
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Beauty Accessories
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Shop All
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Featured Collections
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Anti-Aging Skincare
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Hydrating Skincare
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/rings">
    //                         Brightening Skincare
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/bracelets">
    //                         Exfoliating Skincare
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/charm-bar">
    //                         Cleansing and Purifying Skincare
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </li>
    //         <li>
    //           <NavLink
    //             className="header-nav-item text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]"
    //             to="/collections/fragrance"
    //           >
    //             <span>Fragrance</span>
    //           </NavLink>
    //         </li>
    //         <li onClick={() => toggleMenu(lifestyleMenuRef, lifestyleIconRef)}>
    //           <button
    //             className={`header-nav-item !pr-[27px] text-color-foreground/75 relative hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] ${
    //               lifestyleMenuRef.current &&
    //               !lifestyleMenuRef.current.classList.contains("opacity-0") &&
    //               "underline underline-offset-[2.5px] hover:decoration-2"
    //             }`}
    //             // to="/collections/lifestyle"
    //           >
    //             <span>Lifestyle</span>
    //             <svg
    //               ref={lifestyleIconRef}
    //               aria-hidden="true"
    //               focusable="false"
    //               viewBox="0 0 22 13"
    //               className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
    //             >
    //               <polyline
    //                 points="21.557 1.222 11 11.778 0.443 1.222"
    //                 fill="none"
    //                 stroke="#121212"
    //                 strokeMiterlimit="10"
    //               ></polyline>
    //             </svg>
    //           </button>
    //           <div
    //             className="invisible opacity-0 transition-opacity duration-100 ease-linear absolute left-0 right-0 bg-white top-[calc(100%+1px)]"
    //             ref={lifestyleMenuRef}
    //             tabIndex="-1"
    //           >
    //             <div className="py-6 flex justify-center">
    //               <div className="px-10 grid grid-cols-2 gap-6 w-[32%]">
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Shop by Category
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Apparel
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         Accessories
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Soy Wax Candles
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Kitchen and Home Decor
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/jewelry">
    //                         Shop All
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //                 <div className="">
    //                   <h2 className="mb-2 underline-offset-3px text-sm py-[6px] underline">
    //                     Featured Collections
    //                   </h2>
    //                   <ul role="list">
    //                     <li>
    //                       <a className="link" href="/collections/necklaces">
    //                         Seasonal Favorites
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/earrings">
    //                         City Jewelry and Merch
    //                       </a>
    //                     </li>
    //                     <li>
    //                       <a className="link" href="/collections/rings">
    //                         Kristin Cavallari's Cookbooks
    //                       </a>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </li>
    //         <li>
    //           <NavLink
    //             className="header-nav-item text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]"
    //             to="/collections/sale"
    //           >
    //             <span>Sale</span>
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
  );
}

export default Header;
