import { useSearchParams } from "react-router-dom";
import axios from "../utils/axios";
import { useEffect } from "react";

function VerifyOrder() {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyOrder = async () => {
    try {
      const response = await axios.post(
        "/orders/verify-order",
        { success, orderId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      if (response.data.success) {
        window.location.href = `/checkout/success/${orderId}`;
      } else {
        window.location.href = "/checkout/error";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verifyOrder();
  }, []);

  return <div></div>;
}

export default VerifyOrder;
