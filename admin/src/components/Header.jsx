import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

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
        <ul
          role="list"
          className="col-span-3 mt-3 flex justify-center text-sm max-lg:hidden"
        >
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Products
            </NavLink>
          </li>
          <li className="p-3">
            <NavLink
              reloadDocument={true}
              to="/products/create-product"
              className={({ isActive }) =>
                isActive
                  ? "text-background-primary underline underline-offset-2 decoration-2"
                  : "text-text-secondary hover:text-text-primary hover:underline hover:underline-offset-2"
              }
            >
              Product Creating
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
