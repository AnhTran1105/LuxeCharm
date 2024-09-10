import axios from "../utils/axios";

const CheckoutButton = ({ formData }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post("/orders", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      if (response.url) {
        window.location.href = response.url;
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
