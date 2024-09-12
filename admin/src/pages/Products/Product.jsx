import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
// import CustomPaging from "../../components/CustomPaging";
// import InfoDisclosure from "../../components/InfoDisclosure";
// import Button from "../../components/Button";
// import { Rating } from "react-simple-star-rating";
// import { useDispatch } from "react-redux";
// import { handleAddToCart } from "../redux/cart/cartSlice";

function Product() {
  const [product, setProduct] = useState();
  const [metal, setMetal] = useState();
  // const [metalImages, setMetalImages] = useState({});
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1);

  // const handleIncrease = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const handleDecrease = () => {
  //   if (quantity > 1) {
  //     setQuantity((prev) => prev - 1);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setQuantity(value === "" ? "" : Math.max(1, Number(value)));
  // };

  // const handleBlur = () => {
  //   if (quantity === "" || quantity < 1) {
  //     setQuantity(1);
  //   }
  // };

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get(`/products/${id}`);
        setProduct(productResponse);
        setMetal(productResponse.metals[0].metal);
        // setMetalImages(
        //   productResponse.metals.find(
        //     (item) => item.metal === productResponse.metals[0].metal
        //   ).images
        // );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  // useEffect(() => {
  //   if (metal) {
  //     setMetalImages(
  //       product.metals.find((item) => item.metal === metal).images
  //     );
  //   }
  // }, [metal, product]);

  return (
    product && (
      <button
        type="button"
        onClick={() =>
          (window.location.href = `/products/${id}/update-product`)
        }
      >
        Edit
      </button>
      // <>
      //   <section className="pt-9 pb-3 px-[50px]">
      //     <div className="flex">
      //       <div className="max-w-[55%] w-[55%]">
      //         <CustomPaging
      //           imageUrls={[
      //             metalImages.primary,
      //             metalImages.secondary,
      //             ...metalImages.others,
      //           ]}
      //         />
      //       </div>
      //       <div className="pl-[50px] max-w-[45%] w-[45%]">
      //         <div className="mb-[15px]">
      //           <h1 className="text-[22px]">{product.name}</h1>
      //         </div>
      //         <div className="my-[15px] flex items-center gap-3">
      //           <Rating
      //             transition={true}
      //             size={20}
      //             initialValue={Math.round(product.rating.avgRating * 10) / 10}
      //             fillColor="#a16854"
      //             SVGclassName={`inline-block`}
      //             readonly={true}
      //             allowFraction={true}
      //           />
      //           <div className="mt-1">
      //             {product.rating.count}{" "}
      //             {product.rating.count > 1 ? "Reviews" : "Review"}
      //           </div>
      //         </div>
      //         {product.salePrice ? (
      //           <div className="my-[15px] text-lg flex items-center">
      //             <span className="text-foreground75 line-through mr-4">
      //               ${product.price}.00
      //             </span>
      //             <span className="mr-2">${product.salePrice}.00</span>
      //             <span className="bg-primary w-fit px-3 py-1 rounded-full text-xs text-white">
      //               Sale
      //             </span>
      //           </div>
      //         ) : (
      //           <div className="my-[15px] text-lg">${product.price}.00</div>
      //         )}
      //         <div className="my-[15px]">
      //           <p className="text-[13px] text-foreground75 mb-3">Metal</p>
      //           <div className="flex gap-2">
      //             {product.metals.map((item) => (
      //               <button
      //                 className={`py-[10px] px-[20px] rounded-full border border-solid border-color-foreground/35 hover:border-color-foreground transition-[border] duration-100 tracking-[1px] leading-none text-sm ${
      //                   item.metal === metal && "bg-color-foreground text-white"
      //                 }`}
      //                 key={item.metal}
      //                 onClick={() => setMetal(item.metal)}
      //               >
      //                 {item.metal}
      //               </button>
      //             ))}
      //           </div>
      //         </div>
      //         <div className="my-[15px]">
      //           {product.metals.find((item) => item.metal === metal).quantity <
      //           5 ? (
      //             <p
      //               className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-foreground75"
      //               role="status"
      //             >
      //               <svg width="15" height="15" aria-hidden="true">
      //                 <circle
      //                   cx="7.5"
      //                   cy="7.5"
      //                   r="7.5"
      //                   className="fill-[#f19226]/30"
      //                 ></circle>
      //                 <circle
      //                   cx="7.5"
      //                   cy="7.5"
      //                   r="5"
      //                   stroke="rgb(255, 255, 255)"
      //                   strokeWidth="1"
      //                   className="fill-[#f19226]"
      //                 ></circle>
      //               </svg>
      //               Low stock
      //             </p>
      //           ) : (
      //             <p
      //               className="flex gap-2 items-center uppercase text-[10px] tracking-[1.3px] text-foreground75"
      //               role="status"
      //             >
      //               <svg
      //                 width="15"
      //                 height="15"
      //                 aria-hidden="true"
      //                 className="fill-[rgb(62,214,96)]"
      //               >
      //                 <circle
      //                   cx="7.5"
      //                   cy="7.5"
      //                   r="7.5"
      //                   className="fill-[rgb(62,214,96,0.3)]"
      //                 ></circle>
      //                 <circle
      //                   cx="7.5"
      //                   cy="7.5"
      //                   r="5"
      //                   stroke="rgb(255, 255, 255)"
      //                   strokeWidth="1"
      //                   className="fill-[rgb(62,214,96)]"
      //                 ></circle>
      //               </svg>
      //               {product.quantity <= 5 ? "Low stock" : "In stock"}
      //             </p>
      //           )}
      //         </div>
      //         <div className="my-[15px]">
      //           <p className="text-[13px] text-foreground75 mb-3">Quantity</p>
      //           <div className="quantity">
      //             <button className="quantity-button" onClick={handleDecrease}>
      //               <svg
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 aria-hidden="true"
      //                 focusable="false"
      //                 className="w-[10px]"
      //                 fill="none"
      //                 viewBox="0 0 10 2"
      //               >
      //                 <path
      //                   fillRule="evenodd"
      //                   clipRule="evenodd"
      //                   d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
      //                   fill="currentColor"
      //                 ></path>
      //               </svg>
      //             </button>

      //             <input
      //               className="quantity-input"
      //               type="number"
      //               value={quantity}
      //               onChange={handleInputChange}
      //               onBlur={handleBlur}
      //               min={1}
      //             />

      //             <button className="quantity-button" onClick={handleIncrease}>
      //               <svg
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 aria-hidden="true"
      //                 focusable="false"
      //                 className="w-[10px]"
      //                 fill="none"
      //                 viewBox="0 0 10 10"
      //               >
      //                 <path
      //                   fillRule="evenodd"
      //                   clipRule="evenodd"
      //                   d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
      //                   fill="currentColor"
      //                 ></path>
      //               </svg>
      //             </button>
      //           </div>
      //         </div>
      //         <div className="my-[15px] max-w-[440px]">
      //           <Button
      //             title="Add to cart"
      //             onClick={() =>
      //               dispatch(handleAddToCart({ ...product, metal, quantity }))
      //             }
      //           />
      //         </div>
      //         <div className="my-[15px] max-w-[440px]">
      //           <Button
      //             title="Buy with"
      //             onClick={() =>
      //               dispatch(handleAddToCart({ ...product, quantity }))
      //             }
      //             svgIcon={
      //               <svg
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 viewBox="0 0 24 24"
      //                 width={48}
      //                 height={48}
      //                 id="stripe"
      //               >
      //                 <path
      //                   fill="#fff"
      //                   d="M11.319 9.242h1.673v5.805h-1.673zM4.226 13.355c0-2.005-2.547-1.644-2.547-2.403l.001.002c0-.262.218-.364.567-.368a3.7 3.7 0 0 1 1.658.432V9.434a4.4 4.4 0 0 0-1.654-.307C.9 9.127 0 9.839 0 11.029c0 1.864 2.532 1.561 2.532 2.365 0 .31-.266.413-.638.413-.551 0-1.264-.231-1.823-.538v1.516a4.591 4.591 0 0 0 1.819.382c1.384-.001 2.336-.6 2.336-1.812zM11.314 8.732l1.673-.36V7l-1.673.36zM16.468 9.129a1.86 1.86 0 0 0-1.305.527l-.086-.417H13.61V17l1.665-.357.004-1.902c.24.178.596.425 1.178.425 1.193 0 2.28-.879 2.28-3.016.004-1.956-1.098-3.021-2.269-3.021zm-.397 4.641c-.391.001-.622-.143-.784-.318l-.011-2.501c.173-.193.413-.334.795-.334.607 0 1.027.69 1.027 1.569.005.906-.408 1.584-1.027 1.584zm5.521-4.641c-1.583 0-2.547 1.36-2.547 3.074 0 2.027 1.136 2.964 2.757 2.964.795 0 1.391-.182 1.845-.436v-1.266c-.454.231-.975.371-1.635.371-.649 0-1.219-.231-1.294-1.019h3.259c.007-.087.022-.44.022-.602H24c0-1.725-.825-3.086-2.408-3.086zm-.889 2.448c0-.758.462-1.076.878-1.076.409 0 .844.319.844 1.076h-1.722zm-13.251-.902V9.242H6.188l-.004-1.459-1.625.349-.007 5.396c0 .997.743 1.641 1.729 1.641.548 0 .949-.103 1.171-.224v-1.281c-.214.087-1.264.398-1.264-.595v-2.395h1.264zm3.465.114V9.243c-.225-.08-1.001-.227-1.391.496l-.102-.496h-1.44v5.805h1.662v-3.907c.394-.523 1.058-.42 1.271-.352z"
      //                 ></path>
      //               </svg>
      //             }
      //             className="bg-[#646fde] border-none text-white flex justify-center items-center gap-2 hover:!bg-[#5762c1]"
      //           />
      //         </div>
      //         <div className="border-b border-color-foreground/8">
      //           <p className="my-[25px] text-xs text-foreground75">
      //             {product.description}
      //           </p>
      //         </div>
      //         <InfoDisclosure
      //           title="Materials"
      //           content={product.metals.map((item) => ({
      //             key: item.metal,
      //             value: item.material,
      //           }))}
      //         />
      //         <InfoDisclosure
      //           title="Dimensions"
      //           content={product.dimensions.map((item) => ({
      //             key: item.key,
      //             value: item.value,
      //           }))}
      //         />
      //         <InfoDisclosure
      //           title="Care Instructions"
      //           content={product.careInstructions.map((item) => ({
      //             key: item.key || item.type,
      //             value: item.value || item.content,
      //           }))}
      //         />
      //       </div>
      //     </div>
      //   </section>
      //   <Reviews productId={product._id} avgRating={product.rating.avgRating} />
      // </>
    )
  );
}

export default Product;
