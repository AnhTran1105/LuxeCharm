import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "../utils/axios";
import ReviewModal from "./ReviewModal";

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/reviews/${productId}`);
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productId]);

  console.log(reviews);

  return (
    <section className="mt-4">
      <div className="px-[50px]">
        <div className="mx-auto w-4/5">
          <div className="my-16"></div>
          <div>
            <div className="mb-10">
              <div className="mr-10">
                <div></div>
              </div>
              <Button onClick={() => setOpened(true)} title="Post A Review" />
              <ReviewModal
                isOpened={isOpened}
                setOpened={setOpened}
                productId={productId}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
