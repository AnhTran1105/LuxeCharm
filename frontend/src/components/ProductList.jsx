import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import { openOptionsModal } from "../redux/optionsModal/optionsModalSlice";
import { useNavigate } from "react-router-dom";

function ProductList({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul
      role="list"
      className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4"
    >
      {products.map((product) => (
        <li
          key={`${product._id}-${
            product.defaultMetal && product.defaultMetal.metal
          }`}
          onClick={() =>
            navigate(
              product.defaultMetal
                ? `/products/${product._id}?metal=${product.defaultMetal.metal}`
                : `/products/${product._id}`
            )
          }
          className="group cursor-pointer relative carousel-item"
        >
          <div className="relative overflow-hidden">
            <img
              loading="lazy"
              alt={product.name}
              src={
                product.defaultMetal
                  ? product.defaultMetal.images.primary
                  : product.metals[0].images.primary
              }
              className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
            />
            <img
              alt={product.name}
              src={
                product.defaultMetal
                  ? product.defaultMetal.images.secondary
                  : product.metals[0].images.secondary
              }
              loading="lazy"
              className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[300ms] ease-linear"
            ></img>
          </div>
          {product.salePrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-background-primary w-fit px-3 py-2 rounded-full text-xs text-white">
                {Math.ceil(
                  ((product.price - product.salePrice) / product.price) * 100
                )}
                % Off
              </span>
            </div>
          )}
          <div className="pt-3 pb-4 text-center text-sm">
            <h3>
              <div className="group-hover:underline underline-offset-2">
                {product.name}
              </div>
            </h3>
            <div>
              {product.salePrice ? (
                <div className="mt-2">
                  <span className="text-text-secondary line-through mr-4">
                    ${product.price}.00
                  </span>
                  <span className="mr-2">${product.salePrice}.00</span>
                </div>
              ) : (
                <div className="mt-2">${product.price}.00</div>
              )}
            </div>
          </div>
          {product.metals.length > 1 ? (
            <ButtonTag
              onClick={() =>
                dispatch(
                  openOptionsModal({
                    productId: product._id,
                    defaultMetal: product.defaultMetal,
                  })
                )
              }
            >
              Choose options
            </ButtonTag>
          ) : (
            <ButtonTag
              onClick={() =>
                dispatch(
                  handleAddToCart({
                    ...product,
                    metal: product.metals[0].metal,
                    quantity: 1,
                  })
                )
              }
            >
              Add to cart
            </ButtonTag>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
