import AnchorTag from "./CustomTags/AnchorTag";
import { FacebookIcon, InstagramIcon, PinterestIcon, TiktokIcon } from "./SVG";

function Footer() {
  return (
    <footer className="pt-8 pb-4 bg-background-secondary px-4 md:px-8 lg:px-12 border-t border-border-tertiary">
      <div className="max-w-[920px] mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-3">
          <div className="text-center">
            <h2 className="mb-5 text-lg">Customer Care</h2>
            <div className="space-y-4">
              <AnchorTag className="block" href="/help-guide">
                Help Guide
              </AnchorTag>
              <AnchorTag className="block" href="/shipping">
                Shipping
              </AnchorTag>
              <AnchorTag className="block" href="/returns-exchanges">
                Returns and Exchanges
              </AnchorTag>
            </div>
          </div>
          <div className="text-center">
            <h2 className="mb-5 text-lg">My Account</h2>
            <div className="space-y-4">
              <AnchorTag className="block" href="/login">
                Login or Register
              </AnchorTag>
              <AnchorTag className="block" href="/rewards">
                Rewards
              </AnchorTag>
              <AnchorTag className="block" href="/refer">
                Refer a Friend
              </AnchorTag>
            </div>
          </div>
          <div className="text-center max-sm:col-span-2 max-sm:mt-4">
            <h2 className="mb-5 text-lg">Information</h2>
            <div className="space-y-4">
              <AnchorTag className="block" href="/story">
                Our Story
              </AnchorTag>
              <AnchorTag className="block" href="/blogs">
                LuxeCharm Blogs
              </AnchorTag>
              <AnchorTag className="block" href="/stores">
                Stores
              </AnchorTag>
            </div>
          </div>
        </div>
        <div className="my-8 flex justify-center items-center gap-5">
          <AnchorTag href="/" className="">
            <FacebookIcon width={20} height={20} />
          </AnchorTag>
          <AnchorTag href="/" className="">
            <InstagramIcon width={20} height={20} />
          </AnchorTag>
          <AnchorTag href="/" className="">
            <TiktokIcon width={20} height={20} />
          </AnchorTag>
          <AnchorTag href="/" className="">
            <PinterestIcon width={20} height={20} />
          </AnchorTag>
        </div>
      </div>
      <div className="border-t border-border-tertiary">
        <div className="mt-4 text-center">
          <small className="text-[10px] text-text-secondary">
            © {new Date().getFullYear()},{" "}
            <AnchorTag className="text-[10px]" href="/">
              LuxeCharm
            </AnchorTag>
          </small>
          <small className="text-[10px] policies">
            <AnchorTag className="text-[10px]" href="/refund-policy">
              Refund policy
            </AnchorTag>
          </small>
          <small className="text-[10px] policies">
            <AnchorTag className="text-[10px]" href="/privacy-policy">
              Privacy policy
            </AnchorTag>
          </small>
          <small className="text-[10px] policies">
            <AnchorTag className="text-[10px]" href="/terms-of-service">
              Terms of service
            </AnchorTag>
          </small>
          <small className="text-[10px] policies">
            <AnchorTag className="text-[10px]" href="/accessibility">
              Accessibility
            </AnchorTag>
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
