import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ConfirmModal from "../components/ConfirmModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [isComfirmed, setIsComfirmed] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log(isComfirmed);

  return (
    <div className="my-10 flex flex-col gap-5 px-[50px]">
      <div className="flex gap-4 justify-end">
        <a className="button" href="/products/create-product">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="fill-color-foreground mr-2"
            id="add"
          >
            <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          <span>Create new product</span>
        </a>
        <a className="button" href="/products/create-product">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 60 60"
            width={24}
            height={24}
            viewBox="0 0 60 60"
            id="delete"
            className="fill-color-foreground mr-2"
          >
            <path
              d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1
	h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2
	c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6
	h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z"
            ></path>
            <path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z"></path>
          </svg>
          <span>Delete product</span>
        </a>
      </div>
      <ConfirmModal
        title="Delete products"
        description="Are you sure you want to delete these products?"
        onValueChange={setIsComfirmed}
      />
      <table id="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              onClick={() =>
                (window.location.href =
                  window.location.origin + `/products/${product._id}`)
              }
              className="cursor-pointer text-foreground75 hover:text-color-foreground"
            >
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                {product.quantities.map((item) => (
                  <p key={item.metal}>{item.metal + ": " + item.quantity}</p>
                ))}
              </td>
              <td>${product.price}.00</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
