import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import { openOptionsModal } from "../redux/optionsModal/optionsModalSlice";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <li className="group cursor-pointer relative carousel-item">
      <div
        className="relative overflow-hidden"
        onClick={() =>
          (window.location.href = `/products/${product._id}?variant=${product.metalVariant._id}`)
        }
      >
        <img
          loading="lazy"
          alt={product.name}
          src={product.metalVariant.images.primary}
          className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
        />
        <img
          alt={product.name}
          src={product.metalVariant.images.secondary}
          loading="lazy"
          className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[300ms] ease-linear"
        />
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
          <div className="group-hover:underline underline-offset-2 single-line">
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
      {product.totalVariants > 1 ? (
        <ButtonTag
          onClick={() =>
            dispatch(
              openOptionsModal({
                productId: product._id,
                metalVariant: product.metalVariant,
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
                productId: product._id,
                quantity: 1,
                metalVariantId: product.metalVariant._id,
                priceAtPurchase: product.price,
                salePriceAtPurchase: product.salePrice,
              })
            )
          }
        >
          Add to cart
        </ButtonTag>
      )}
    </li>
  );
}

export default ProductItem;
