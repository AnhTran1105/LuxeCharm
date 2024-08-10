import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

const HeaderMenu = ({ children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Tippy
      interactive
      hideOnClick={true}
      offset={[0, 0]}
      placement="bottom"
      visible={true}
      render={(attrs) => (
        <div className="w-full bg-white" tabIndex="-1" {...attrs}>
          <div className="py-6">
            <div className="px-10 grid grid-cols-3 gap-6">
              <div className="w-[16%]">
                <h2 className="">Shop by Category</h2>
                <ul role="list">
                  <li>
                    <a href="/collections/necklaces">Necklaces</a>
                  </li>
                  <li>
                    <a href="/collections/earrings">Earrings</a>
                  </li>
                  <li>
                    <a href="/collections/rings">Rings</a>
                  </li>
                  <li>
                    <a href="/collections/bracelets">Bracelets</a>
                  </li>
                  <li>
                    <a href="/collections/charm-bar">Charms</a>
                  </li>
                  <li>
                    <a href="/collections/jewelry">Shop All</a>
                  </li>
                </ul>
              </div>
              <div className="w-[16%]">
                <h2>Shop by Category</h2>
                <ul role="list">
                  <li>
                    <a href="/collections/necklaces">Necklaces</a>
                  </li>
                  <li>
                    <a href="/collections/earrings">Earrings</a>
                  </li>
                  <li>
                    <a href="/collections/rings">Rings</a>
                  </li>
                  <li>
                    <a href="/collections/bracelets">Bracelets</a>
                  </li>
                  <li>
                    <a href="/collections/charm-bar">Charms</a>
                  </li>
                  <li>
                    <a href="/collections/jewelry">Shop All</a>
                  </li>
                </ul>
              </div>
              <div className="w-[16%]">
                <h2>Shop by Category</h2>
                <ul role="list">
                  <li>
                    <a href="/collections/necklaces">Necklaces</a>
                  </li>
                  <li>
                    <a href="/collections/earrings">Earrings</a>
                  </li>
                  <li>
                    <a href="/collections/rings">Rings</a>
                  </li>
                  <li>
                    <a href="/collections/bracelets">Bracelets</a>
                  </li>
                  <li>
                    <a href="/collections/charm-bar">Charms</a>
                  </li>
                  <li>
                    <a href="/collections/jewelry">Shop All</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};
export default HeaderMenu;
