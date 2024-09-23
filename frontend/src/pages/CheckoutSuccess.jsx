import { useEffect, useState } from "react";
import ButtonTag from "../components/CustomTags/ButtonTag";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";

function CheckoutSuccess() {
  const [order, setOrder] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [orderId]);

  return (
    order && (
      <div className="my-10 flex justify-center">
        <div className="w-full lg:w-4/5 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 60 60"
                viewBox="0 0 60 60"
                width={128}
                height={128}
                id="check"
                className="fill-[#50b748]"
              >
                <path
                  d="M30,5C16.2,5,5,16.2,5,30s11.2,25,25,25s25-11.2,25-25S43.8,5,30,5z M30,53C17.3,53,7,42.7,7,30S17.3,7,30,7s23,10.3,23,23
    	S42.7,53,30,53z"
                ></path>
                <polygon points="25.3 37.3 17.1 29.2 15.7 30.6 25.3 40.2 44.3 21.2 42.9 19.8"></polygon>
              </svg>
            </i>
            <div className="mt-4 text-xl text-center">
              Thank you for your purchase!
            </div>
            <div className="text-text-secondary text-sm text-center">
              We will email you an order confirmation with details and tracking
              info.
            </div>
            <div>
              <ButtonTag
                onClick={() => (window.location.href = "/all-jewelry")}
              >
                Continue shopping
              </ButtonTag>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default CheckoutSuccess;
