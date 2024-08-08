function Header() {
  return (
    <header className="py-2 px-[50px] relative">
      <div className="h-[4.4rem] w-[4.4rem] p-0">
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            id="search"
            className="h-[20px] w-[20px]"
          >
            <g>
              <path d="M359,344.9a170.577,170.577,0,0,0,43.4-113.8c0-94.5-76.9-171.3-171.3-171.3-94.5,0-171.3,76.9-171.3,171.3s76.9,171.3,171.3,171.3A170.577,170.577,0,0,0,344.9,359l90.3,90.3a9.82,9.82,0,0,0,7.1,2.9,10.243,10.243,0,0,0,7.1-2.9,9.959,9.959,0,0,0,0-14.1ZM79.7,231.1c0-83.4,67.9-151.3,151.3-151.3s151.3,67.9,151.3,151.3S314.4,382.4,231,382.4,79.7,314.5,79.7,231.1Z"></path>
            </g>
          </svg>
        </span>
      </div>
      <h1>
        <a href="/">
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
      <div>
        <a href="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            fill="none"
            viewBox="0 0 18 19"
            className="w-[20px] h-[20px]"
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
        <a href="/cart">
          <svg
            x="0px"
            y="0px"
            width="17.24px"
            height="15.822px"
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
      <nav className="header__inline-menu">
        <ul className="list-menu list-menu--inline" role="list">
          <li>
            <a
              href="/collections/bestsellers"
              className="header__menu-item list-menu__item link link--text focus-inset"
            >
              <span>Best Sellers</span>
            </a>
          </li>
          <li>
            <header-menu>
              <details id="Details-HeaderMenu-2" className="mega-menu">
                <summary className="header__menu-item list-menu__item link focus-inset">
                  <span>Jewelry</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="icon icon-caret"
                    viewBox="0 0 22 13"
                  >
                    <polyline
                      points="21.557 1.222 11 11.778 0.443 1.222"
                      fill="none"
                      stroke="#121212"
                      strokeMiterlimit="10"
                    ></polyline>
                  </svg>
                </summary>

                <div
                  id="MegaMenu-Content-2"
                  className="mega-menu__content gradient motion-reduce global-settings-popup"
                  tabIndex="-1"
                >
                  <div className="mega-menu__list page-width" role="list">
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Shop by Category
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/necklaces"
                            className="mega-menu__link link"
                          >
                            Necklaces
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/earrings"
                            className="mega-menu__link link"
                          >
                            Earrings
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/rings"
                            className="mega-menu__link link"
                          >
                            Rings
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/bracelets"
                            className="mega-menu__link link"
                          >
                            Bracelets
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/charm-bar"
                            className="mega-menu__link link"
                          >
                            Charms
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/jewelry"
                            className="mega-menu__link link"
                          >
                            Shop All
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Featured Collections
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/vermeil-jewelry"
                            className="mega-menu__link link"
                          >
                            Vermeil
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/silver"
                            className="mega-menu__link link"
                          >
                            Silver Jewelry
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/engravable-jewelry"
                            className="mega-menu__link link"
                          >
                            Engravable Jewelry
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/bestsellers"
                            className="mega-menu__link link"
                          >
                            Best Sellers
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/signature-sets"
                            className="mega-menu__link link"
                          >
                            Signature Sets
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/kristins-monthly-style-edit"
                            className="mega-menu__link link"
                          >
                            Kristin's Style Edit
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Trending Collections
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/charm-bar"
                            className="mega-menu__link link"
                          >
                            Charms
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/color"
                            className="mega-menu__link link"
                          >
                            Colorful Jewelry
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/layer-up"
                            className="mega-menu__link link"
                          >
                            Layer Up Collection
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/wedding-season"
                            className="mega-menu__link link"
                          >
                            Wedding Season Collection
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/just-add-sparkle"
                            className="mega-menu__link link"
                          >
                            Just Add Sparkle
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </header-menu>
          </li>
          <li>
            <header-menu>
              <details id="Details-HeaderMenu-3" className="mega-menu">
                <summary className="header__menu-item list-menu__item link focus-inset">
                  <span>Beauty</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="icon icon-caret"
                    viewBox="0 0 22 13"
                  >
                    <polyline
                      points="21.557 1.222 11 11.778 0.443 1.222"
                      fill="none"
                      stroke="#121212"
                      strokeMiterlimit="10"
                    ></polyline>
                  </svg>
                </summary>

                <div
                  id="MegaMenu-Content-3"
                  className="mega-menu__content gradient motion-reduce global-settings-popup"
                  tabIndex="-1"
                >
                  <div className="mega-menu__list page-width" role="list">
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Shop by Category
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/beauty-bundles"
                            className="mega-menu__link link"
                          >
                            Bundles and Duos
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/beauty-accessories"
                            className="mega-menu__link link"
                          >
                            Beauty Accessories
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/uncommon-beauty"
                            className="mega-menu__link link"
                          >
                            Shop All
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Featured Collections
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/anti-aging"
                            className="mega-menu__link link"
                          >
                            Anti-Aging Skincare
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/hydrating"
                            className="mega-menu__link link"
                          >
                            Hydrating Skincare
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/brightening"
                            className="mega-menu__link link"
                          >
                            Brightening Skincare
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/exfoliation"
                            className="mega-menu__link link"
                          >
                            Exfoliating Skincare
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/cleansing"
                            className="mega-menu__link link"
                          >
                            Cleansing and Purifying Skincare
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </header-menu>
          </li>
          <li>
            <a
              href="/products/hard-feelings-fragrance"
              className="header__menu-item list-menu__item link link--text focus-inset"
            >
              <span>Fragrance</span>
            </a>
          </li>
          <li>
            <header-menu>
              <details id="Details-HeaderMenu-5" className="mega-menu">
                <summary className="header__menu-item list-menu__item link focus-inset">
                  <span>Lifestyle</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="icon icon-caret"
                    viewBox="0 0 22 13"
                  >
                    <polyline
                      points="21.557 1.222 11 11.778 0.443 1.222"
                      fill="none"
                      stroke="#121212"
                      strokeMiterlimit="10"
                    ></polyline>
                  </svg>
                </summary>

                <div
                  id="MegaMenu-Content-5"
                  className="mega-menu__content gradient motion-reduce global-settings-popup"
                  tabIndex="-1"
                >
                  <div className="mega-menu__list page-width" role="list">
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Shop by Category
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/apparel"
                            className="mega-menu__link link"
                          >
                            Apparel
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/accessories"
                            className="mega-menu__link link"
                          >
                            Accessories
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/candles"
                            className="mega-menu__link link"
                          >
                            Soy Wax Candles
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/uj-home"
                            className="mega-menu__link link"
                          >
                            Kitchen and Home Decor
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/uncommon-lifestyle"
                            className="mega-menu__link link"
                          >
                            Shop All
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="mega-menu__link--level-2-title">
                        Featured Collections
                      </h2>

                      <ul className="list-unstyled" role="list">
                        <li>
                          <a
                            href="/collections/seasonal-favorites"
                            className="mega-menu__link link"
                          >
                            Seasonal Favorites
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/city-jewelry-and-merch"
                            className="mega-menu__link link"
                          >
                            City Jewelry and Merch
                          </a>
                        </li>
                        <li>
                          <a
                            href="/collections/kristins-cookbooks"
                            className="mega-menu__link link"
                          >
                            Kristin Cavallari's Cookbooks
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </header-menu>
          </li>
          <li>
            <a
              href="/collections/sale"
              className="header__menu-item list-menu__item link link--text focus-inset"
            >
              <span>Sale</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
