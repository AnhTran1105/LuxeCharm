import { useSearchParams } from "react-router-dom";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function VerifyOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyOrder = async () => {
    try {
      const response = await axios.post(
        "/order/verify-order",
        { success, orderId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      if (response.success) {
        window.location.href = "/checkout/success";
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
