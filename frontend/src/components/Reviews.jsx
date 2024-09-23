import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ReviewModal from "./ReviewModal";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import ButtonTag from "./CustomTags/ButtonTag";
import { MultipleStarsIcon } from "./SVG";

const tooltipArray = ["Terrible", "Bad", "Average", "Great", "Awesome"];
function Reviews({ productId, avgRating }) {
  const [reviews, setReviews] = useState([]);
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/reviews/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productId]);

  return (
    reviews && (
      <section className="mt-8">
        <div className="mx-auto w-full lg:w-4/5">
          {reviews.length > 0 && (
            <>
              <div className="my-16"></div>
              <div>
                <div className="flex justify-center items-center">
                  <div className="border-r border-border-tertiary">
                    <div className="mr-6 md:mr-10 flex gap-4">
                      <div className="font-SofiaBold text-text-primary text-4xl">
                        {Math.round(avgRating * 10) / 10}
                      </div>
                      <div>
                        <Rating
                          transition={true}
                          size={24}
                          initialValue={Math.round(avgRating * 10) / 10}
                          fillColor="#a16854"
                          SVGclassName={`inline-block`}
                          readonly={true}
                          allowFraction={true}
                        />
                        <div className="text-text-secondary text-sm mt-1">
                          Based on {reviews.length}{" "}
                          {reviews.length > 1 ? "reviews" : "review"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ButtonTag
                      onClick={() => setOpened(true)}
                      buttonType="rounded"
                      className="ml-7 md:ml-11"
                    >
                      Write a review
                    </ButtonTag>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="">
            {reviews.length > 0 ? (
              <ul role="list" className="mt-10">
                {reviews.map((review) => (
                  <li
                    key={review._id}
                    className="last-of-type:border-t border-border-tertiary"
                  >
                    <div className="my-10">
                      <div className="flex items-center">
                        <div className="mr-3 relative">
                          <i>
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 600 600"
                              width="40"
                              height="40"
                              fill="#8D99B6"
                            >
                              <title>Abstract user icon</title>
                              <defs>
                                <clipPath id="circular-border-0.03903691315607927">
                                  <circle cx="300" cy="300" r="250"></circle>
                                </clipPath>
                              </defs>
                              <circle
                                cx="300"
                                cy="300"
                                r="280"
                                fill="#CCD2E1"
                              ></circle>
                              <circle cx="300" cy="230" r="100"></circle>
                              <circle
                                cx="300"
                                cy="550"
                                r="190"
                                clipPath="url(#circular-border-0.03903691315607927)"
                              ></circle>
                            </svg>
                          </i>
                          <i className="absolute top-7 left-7">
                            <svg
                              width="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="7.5"
                                cy="7.5"
                                r="7.5"
                                fill="#1cc286"
                              ></circle>
                              <path
                                d="M4 7.22222L6.72269 10L11.5 5.5"
                                stroke="white"
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </i>
                        </div>
                        <div className="pt-1">
                          <p>
                            {review.userId.lastName} {review.userId.firstName}
                          </p>
                          <p className="text-xs text-text-secondary">
                            Verified Buyer
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-text-secondary text-sm">
                        {moment(review.createdAt).format("ll")}
                      </div>
                      <div className="flex items-center gap-3">
                        <Rating
                          transition={true}
                          size={20}
                          initialValue={review.rating}
                          fillColor="#a16854"
                          SVGclassName={`inline-block`}
                          readonly={true}
                          allowFraction={true}
                        />
                        <div className="pt-1 ">
                          {tooltipArray[review.rating - 1]}
                        </div>
                      </div>
                      <div className="mt-4 text-text-secondary text-sm">
                        {review.content}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end items-center gap-3 text-sm">
                      Was this review helpful?
                      <div className="flex gap-3">
                        <div className="flex gap-2 items-center">
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="13"
                              viewBox="0 0 14 13"
                            >
                              <path
                                d="M8.65454 4.68473H12.7273C13.0648 4.68473 13.3885 4.81882 13.6272 5.0575C13.8659 5.29619 14 5.61991 14 5.95746V7.29637C14.0002 7.46269 13.9677 7.62743 13.9045 7.78128L11.935 12.5635C11.887 12.6801 11.8054 12.7798 11.7005 12.85C11.5957 12.9201 11.4725 12.9575 11.3464 12.9575H0.636364C0.467589 12.9575 0.305728 12.8904 0.186387 12.7711C0.0670452 12.6517 0 12.4899 0 12.3211V5.95746C0 5.78868 0.0670452 5.62682 0.186387 5.50748C0.305728 5.38814 0.467589 5.32109 0.636364 5.32109H2.85218C2.95406 5.32112 3.05446 5.29668 3.14493 5.24984C3.2354 5.203 3.31331 5.13512 3.37209 5.05191L6.84218 0.134731C6.88605 0.0725664 6.95074 0.0281786 7.02452 0.00961572C7.09831 -0.00894717 7.1763 -0.000456173 7.24436 0.0335492L8.39873 0.610731C8.72359 0.773107 8.98312 1.04175 9.13419 1.37202C9.28526 1.7023 9.31878 2.07432 9.22918 2.42628L8.65454 4.68473ZM3.81818 6.33164V11.6847H10.92L12.7273 7.29637V5.95746H8.65454C8.46071 5.95743 8.26944 5.91313 8.09533 5.82793C7.92122 5.74273 7.76887 5.61889 7.6499 5.46586C7.53093 5.31282 7.4485 5.13464 7.40887 4.94489C7.36925 4.75515 7.37349 4.55886 7.42127 4.371L7.99591 2.11319C8.01389 2.04276 8.00722 1.96829 7.977 1.90219C7.94678 1.83608 7.89484 1.78231 7.82982 1.74982L7.40918 1.53982L4.41191 5.78564C4.25282 6.01091 4.04918 6.19546 3.81818 6.33164ZM2.54545 6.59382H1.27273V11.6847H2.54545V6.59382Z"
                                fill="#2c2c2c"
                              ></path>
                            </svg>
                          </i>
                          {review.likes}
                        </div>
                        <div className="flex gap-2 items-center">
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="13"
                              viewBox="0 0 14 13"
                            >
                              <path
                                d="M5.34545 8.27273H1.27273C0.93518 8.27273 0.611456 8.13864 0.372774 7.89995C0.134091 7.66127 6.77279e-07 7.33755 6.77279e-07 7V5.66109C-0.000170899 5.49477 0.0322586 5.33003 0.0954552 5.17618L2.06564 0.394545C2.11354 0.277934 2.19501 0.178179 2.29969 0.107935C2.40438 0.0376913 2.52757 0.00012439 2.65364 0H13.3636C13.5324 0 13.6943 0.0670452 13.8136 0.186387C13.933 0.305728 14 0.467589 14 0.636364V7C14 7.16877 13.933 7.33063 13.8136 7.44998C13.6943 7.56932 13.5324 7.63636 13.3636 7.63636H11.1478C11.0459 7.63634 10.9455 7.66077 10.8551 7.70761C10.7646 7.75446 10.6867 7.82234 10.6279 7.90554L7.15782 12.8221C7.11395 12.8843 7.04926 12.9286 6.97548 12.9472C6.90169 12.9658 6.8237 12.9573 6.75564 12.9233L5.60127 12.3455C5.27641 12.1831 5.01688 11.9144 4.86581 11.5842C4.71474 11.2539 4.68122 10.8819 4.77082 10.5299L5.34545 8.27273ZM10.1818 6.62582V1.27273H3.08L1.27273 5.66109V7H5.34545C5.53929 7.00003 5.73056 7.04433 5.90467 7.12953C6.07878 7.21472 6.23113 7.33856 6.3501 7.4916C6.46906 7.64463 6.5515 7.82282 6.59113 8.01257C6.63075 8.20231 6.62651 8.3986 6.57873 8.58645L6.00409 10.8443C5.98611 10.9147 5.99278 10.9892 6.023 11.0553C6.05321 11.1214 6.10516 11.1751 6.17018 11.2076L6.59082 11.4176L9.58809 7.17182C9.74718 6.94655 9.95082 6.762 10.1818 6.62582ZM11.4545 6.36364H12.7273V1.27273H11.4545V6.36364Z"
                                fill="#2c2c2c"
                              ></path>
                            </svg>
                          </i>
                          {review.likes}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3"></div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="my-20 flex flex-col justify-center">
                <div className="text-center">
                  <i className="flex justify-center">
                    <MultipleStarsIcon />
                  </i>
                  <div className="font-SofiaBold mt-3 text-lg">
                    We’re looking for feedback!
                  </div>
                  <div className="my-4">Let us know what you think</div>
                  <div>
                    <ButtonTag
                      onClick={() => setOpened(true)}
                      buttonType="rounded"
                    >
                      Be the first to write a review!
                    </ButtonTag>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ReviewModal
          isOpened={isOpened}
          setOpened={setOpened}
          productId={productId}
        />
      </section>
    )
  );
}

export default Reviews;
