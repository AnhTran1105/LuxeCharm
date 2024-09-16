import LinkTag from "./CustomTags/LinkTag";

function Footer() {
  return (
    <footer className="pt-12 pb-4 bg-background-secondary">
      <div className="max-w-[920px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <h2 className="mb-5 text-lg">Customer Care</h2>
            <div className="space-y-4">
              <LinkTag className="block" to="/help-guide">
                Help Guide
              </LinkTag>
              <LinkTag className="block" to="/shipping">
                Shipping
              </LinkTag>
              <LinkTag className="block" to="/returns-exchanges">
                Returns and Exchanges
              </LinkTag>
              <LinkTag className="block" to="/gift-cards">
                Gift Cards
              </LinkTag>
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-lg">My Account</h2>
            <div className="space-y-4">
              <LinkTag className="block" to="/login">
                Login or Register
              </LinkTag>
              <LinkTag className="block" to="/rewards">
                Rewards
              </LinkTag>
              <LinkTag className="block" to="/refer">
                Refer a Friend
              </LinkTag>
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-lg">Information</h2>
            <div className="space-y-4">
              <LinkTag className="block" to="/story">
                Our Story
              </LinkTag>
              <LinkTag className="block" to="/blogs">
                LuxeCharm Blogs
              </LinkTag>
              <LinkTag className="block" to="/stores">
                Stores
              </LinkTag>
              <LinkTag className="block" to="/careers">
                Careers
              </LinkTag>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <ul role="list" className="flex justify-center">
            <li>
              <a href="/" className="group p-[13px]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 18 18"
                  className="w-[18px] hover:scale-110 h-[18px]"
                >
                  <path
                    fill="currentColor"
                    d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/" className="group p-[13px]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="w-[18px] hover:scale-110 h-[18px]"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill="currentColor"
                    d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/" className="group p-[13px]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="w-[18px] hover:scale-110 h-[18px]"
                  width="16"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.02 0H11s-.17 3.82 4.13 4.1v2.95s-2.3.14-4.13-1.26l.03 6.1a5.52 5.52 0 11-5.51-5.52h.77V9.4a2.5 2.5 0 101.76 2.4L8.02 0z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/" className="group p-[13px]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="w-[18px] hover:scale-110 h-[18px]"
                  viewBox="0 0 17 18"
                >
                  <path
                    fill="currentColor"
                    d="M8.48.58a8.42 8.42 0 015.9 2.45 8.42 8.42 0 011.33 10.08 8.28 8.28 0 01-7.23 4.16 8.5 8.5 0 01-2.37-.32c.42-.68.7-1.29.85-1.8l.59-2.29c.14.28.41.52.8.73.4.2.8.31 1.24.31.87 0 1.65-.25 2.34-.75a4.87 4.87 0 001.6-2.05 7.3 7.3 0 00.56-2.93c0-1.3-.5-2.41-1.49-3.36a5.27 5.27 0 00-3.8-1.43c-.93 0-1.8.16-2.58.48A5.23 5.23 0 002.85 8.6c0 .75.14 1.41.43 1.98.28.56.7.96 1.27 1.2.1.04.19.04.26 0 .07-.03.12-.1.15-.2l.18-.68c.05-.15.02-.3-.11-.45a2.35 2.35 0 01-.57-1.63A3.96 3.96 0 018.6 4.8c1.09 0 1.94.3 2.54.89.61.6.92 1.37.92 2.32 0 .8-.11 1.54-.33 2.21a3.97 3.97 0 01-.93 1.62c-.4.4-.87.6-1.4.6-.43 0-.78-.15-1.06-.47-.27-.32-.36-.7-.26-1.13a111.14 111.14 0 01.47-1.6l.18-.73c.06-.26.09-.47.09-.65 0-.36-.1-.66-.28-.89-.2-.23-.47-.35-.83-.35-.45 0-.83.2-1.13.62-.3.41-.46.93-.46 1.56a4.1 4.1 0 00.18 1.15l.06.15c-.6 2.58-.95 4.1-1.08 4.54-.12.55-.16 1.2-.13 1.94a8.4 8.4 0 01-5-7.65c0-2.3.81-4.28 2.44-5.9A8.04 8.04 0 018.48.57z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-tertiary">
        <div className="px-[50px] mx-auto flex justify-center">
          <div className="text-center mt-4 flex items-center">
            <small className="text-xs text-text-secondary">
              © {new Date().getFullYear()},{" "}
              <LinkTag className="text-xs" to="/">
                LuxeCharm
              </LinkTag>
            </small>
            <div className="flex">
              <li className="policies flex justify-center items-center text-text-secondary">
                <small className="text-xs text-text-secondary">
                  <LinkTag className="text-xs" to="/refund-policy">
                    Refund policy
                  </LinkTag>
                </small>
              </li>
              <li className="policies flex justify-center items-center text-text-secondary">
                <small className="text-xs text-text-secondary">
                  <LinkTag className="text-xs" to="/privacy-policy">
                    Privacy policy
                  </LinkTag>
                </small>
              </li>
              <li className="policies flex justify-center items-center text-text-secondary">
                <small className="text-xs text-text-secondary">
                  <LinkTag className="text-xs" to="/terms-of-service">
                    Terms of service
                  </LinkTag>
                </small>
              </li>
              <li className="policies flex justify-center items-center text-text-secondary">
                <small className="text-xs text-text-secondary">
                  <LinkTag className="text-xs" to="/accessibility">
                    Accessibility
                  </LinkTag>
                </small>
              </li>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
