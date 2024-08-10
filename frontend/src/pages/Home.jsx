import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div>
      <div>
        <a href="/products/hard-feelings-fragrance">
          <img
            src="//uncommonjames.com/cdn/shop/files/Fragrance_Jul24_Hero_Desktop.jpg?v=1721940727&amp;width=2100"
            alt=""
            srcSet="//uncommonjames.com/cdn/shop/files/Fragrance_Jul24_Hero_Desktop.jpg?v=1721940727&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fragrance_Jul24_Hero_Desktop.jpg?v=1721940727&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fragrance_Jul24_Hero_Desktop.jpg?v=1721940727&amp;width=2100 2100w"
            width="2100"
            height="1050.0"
            loading="lazy"
            sizes="(min-width: 750px) 50vw, 100vw"
          />
        </a>
      </div>
      <div className="pt-3 mb-[20px]">
        <ul role="list" className="grid grid-cols-5 gap-3 px-[15px]">
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard isOptional={true} />
          </li>
          <li>
            <ProductCard isOff={true} />
          </li>
          <li>
            <ProductCard isOptional={true} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
