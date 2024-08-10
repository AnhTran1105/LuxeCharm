import { NavLink } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="py-2 px-[50px] relative grid grid-cols-4 items-center border-b-[1px] border-color-foreground/8 text-[14px]">
      <div className="h-[44px] w-[44px] flex items-center p-0 col-span-1 group cursor-pointer">
        <span className="flex justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            id="search"
            className="h-[20px] w-[20px] group-hover:scale-[1.07]"
          >
            <g>
              <path d="M359,344.9a170.577,170.577,0,0,0,43.4-113.8c0-94.5-76.9-171.3-171.3-171.3-94.5,0-171.3,76.9-171.3,171.3s76.9,171.3,171.3,171.3A170.577,170.577,0,0,0,344.9,359l90.3,90.3a9.82,9.82,0,0,0,7.1,2.9,10.243,10.243,0,0,0,7.1-2.9,9.959,9.959,0,0,0,0-14.1ZM79.7,231.1c0-83.4,67.9-151.3,151.3-151.3s151.3,67.9,151.3,151.3S314.4,382.4,231,382.4,79.7,314.5,79.7,231.1Z"></path>
            </g>
          </svg>
        </span>
      </div>
      <h1 className="col-span-2 justify-self-center">
        <a href="/" className="p-[7.5px] flex items-center">
          <div>
            <img
              src="//uncommonjames.com/cdn/shop/files/logo__uj.svg?v=1685119912&amp;width=600"
              alt="Uncommon James Homepage"
              srcSet="//uncommonjames.com/cdn/shop/files/logo__uj.svg?v=1685119912&amp;width=170 170w, //uncommonjames.com/cdn/shop/files/logo__uj.svg?v=1685119912&amp;width=255 255w, //uncommonjames.com/cdn/shop/files/logo__uj.svg?v=1685119912&amp;width=340 340w"
              width="170"
              height="16.11111111111111"
              loading="eager"
              sizes="(max-width: 340px) 50vw, 170px"
            />
          </div>
        </a>
      </h1>
      <div className="col-span-1 justify-self-end flex">
        <a
          href="/account"
          className="h-[44px] w-[44px] flex items-center group cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            fill="none"
            viewBox="0 0 18 19"
            className="w-[20px] h-[20px] group-hover:scale-[1.07]"
          >
            <g>
              <circle
                cx="9"
                cy="4.3273"
                r="3.367"
                fill="none"
                stroke="#231f20"
                strokeMiterlimit="10"
              ></circle>
              <path
                d="M15.25,15.1109a6.25,6.25,0,0,0-12.5,0Z"
                fill="none"
                stroke="#231f20"
                strokeMiterlimit="10"
              ></path>
            </g>
          </svg>
        </a>
        <a
          href="/cart"
          className="h-[44px] w-[44px] flex items-center group cursor-pointer"
        >
          <svg
            className="group-hover:scale-[1.07]"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0.218 4.167 17.24 15.822"
            enableBackground="new 0.218 4.167 17.24 15.822"
            xmlSpace="preserve"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g>
              <polyline
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                points="0.218,4.664 2.864,4.664 5.335,15.42 15.22,15.42 	"
              ></polyline>
              <polyline
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                points="3.321,6.655 16.856,6.655 15.429,13.262 4.906,13.262 	"
              ></polyline>
              <path
                fill="#231F20"
                d="M7.433,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785s-0.785-0.351-0.785-0.785l0,0
  		C6.648,17.771,7,17.419,7.433,17.419 M7.433,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
  		c0.986,0,1.785-0.799,1.785-1.785C9.217,17.219,8.418,16.421,7.433,16.419z"
              ></path>
              <path
                fill="#231F20"
                d="M13.37,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785c-0.433,0-0.785-0.351-0.785-0.785
  		l0,0C12.585,17.771,12.937,17.419,13.37,17.419 M13.37,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
  		c0.986,0,1.785-0.799,1.785-1.785C15.154,17.219,14.355,16.421,13.37,16.419z"
              ></path>
              <line
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                x1="4.091"
                y1="10.004"
                x2="16.133"
                y2="10.004"
              ></line>
              <line
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                x1="6.604"
                y1="6.655"
                x2="7.433"
                y2="13.262"
              ></line>
              <line
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                x1="10.291"
                y1="6.712"
                x2="10.291"
                y2="13.156"
              ></line>
              <line
                fill="none"
                stroke="#231F20"
                strokeMiterlimit="10"
                x1="14.009"
                y1="6.712"
                x2="12.731"
                y2="13.262"
              ></line>
            </g>
          </svg>
        </a>
      </div>
      <nav className="col-span-2 col-start-2">
        <ul role="list" className="flex justify-center items-center">
          <li>
            <NavLink
              className={`header-nav-item text-color-foreground/75  hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] 
                text-hover hover:text-hover`}
              to="/collections/bestsellers"
            >
              <span>Best Sellers</span>
            </NavLink>
          </li>
          <HeaderMenu>
            <li>
              <NavLink
                className="header-nav-item !pr-[27px] text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] relative"
                // to="/collections/jewelry"
              >
                <span>Jewelry</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 22 13"
                  className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
                >
                  <polyline
                    points="21.557 1.222 11 11.778 0.443 1.222"
                    fill="none"
                    stroke="#121212"
                    strokeMiterlimit="10"
                  ></polyline>
                </svg>
              </NavLink>
            </li>
          </HeaderMenu>
          <li>
            <NavLink
              className="header-nav-item !pr-[27px] text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s] relative"
              to="/collections/beauty"
            >
              <span>Beauty</span>
              <svg
                className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 22 13"
              >
                <polyline
                  points="21.557 1.222 11 11.778 0.443 1.222"
                  fill="none"
                  stroke="#121212"
                  strokeMiterlimit="10"
                ></polyline>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header-nav-item text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]"
              to="/collections/fragrance"
            >
              <span>Fragrance</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header-nav-item !pr-[27px] text-color-foreground/75 relative hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]"
              to="/collections/lifestyle"
            >
              <span>Lifestyle</span>
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 22 13"
                className="absolute right-[8px] h-[6px] top-[calc(50%-2px)]"
              >
                <polyline
                  points="21.557 1.222 11 11.778 0.443 1.222"
                  fill="none"
                  stroke="#121212"
                  strokeMiterlimit="10"
                ></polyline>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header-nav-item text-color-foreground/75 hover:text-color-foreground hover:underline hover:underline-offset-[2.5px] transition-[text-decoration] ease-linear duration-[0.1s]"
              to="/collections/sale"
            >
              <span>Sale</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
