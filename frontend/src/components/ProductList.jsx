import ProductItem from "./ProductItem";

function ProductList({ products }) {
  console.log(products);
  return (
    <ul
      role="list"
      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4"
    >
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
