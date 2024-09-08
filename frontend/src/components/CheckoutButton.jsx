import { useStripe } from "@stripe/react-stripe-js";
import axios from "../utils/axios";

const CheckoutButton = () => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "/order",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      const { sessionId } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
    >
      Proceed to payment
    </button>
  );
};

export default CheckoutButton;
