import { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import axios from "../utils/axios";
import AnchorTag from "../components/CustomTags/AnchorTag";

function Home() {
  const [products, setProducts] = useState([]);

  const getRandomProducts = (products, num) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="mb-4 space-y-4">
      <AnchorTag href="/all-jewelry">
        <img
          src="https://uncommonjames.com/cdn/shop/files/SterlingSilver_Sept24_Hero_Desktop.jpg?v=1725976472&width=2100"
          alt=""
          loading="lazy"
          className="w-full"
        />
      </AnchorTag>

      {products && (
        <ProductCarousel products={getRandomProducts(products, 5)} />
      )}

      <AnchorTag href="/all-jewelry" className="flex">
        <img
          src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=2100"
          alt=""
          srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=2100 2100w"
          width="2100"
          height="1050.0"
          loading="lazy"
          sizes="(min-width: 750px) 50vw, 100vw"
        />
      </AnchorTag>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AnchorTag href="/necklaces" className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-105 aspect-square transition-transform duration-300 ease-linear w-full"
              srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571 360w"
              src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=1500"
              sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="pt-3 text-center text-base">
            <span>Necklaces</span>
          </div>
        </AnchorTag>
        <AnchorTag href="/earrings" className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-105 aspect-square transition-transform duration-300 ease-linear w-full"
              srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582 360w
                "
              src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=1500"
              sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="pt-3 text-center text-base">
            <span>Earrings</span>
          </div>
        </AnchorTag>
        <AnchorTag href="/rings" className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-105 aspect-square transition-transform duration-300 ease-linear w-full"
              srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594 360w
                "
              src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=1500"
              sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="pt-3 text-center text-base">
            <span>Rings</span>
          </div>
        </AnchorTag>
        <AnchorTag href="/bracelets" className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-105 aspect-square transition-transform duration-300 ease-linear w-full"
              srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604 360w
                "
              src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=1500"
              sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="pt-3 text-center text-base">
            <span>Bracelets</span>
          </div>
        </AnchorTag>
      </div>

      <AnchorTag href="/bestsellers" className="flex">
        <img
          src="//uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=2100"
          alt=""
          srcSet="//uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=2100 2100w"
          width="2100"
          height="1050.0"
          loading="lazy"
          sizes="(min-width: 750px) 50vw, 100vw"
        />
      </AnchorTag>

      <div className="grid grid-cols-3 gap-3">
        <AnchorTag
          href="/statement-pieces"
          className="flex col-start-1 col-span-2 row-span-2"
        >
          <img
            src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Standout.jpg?v=1721661722&amp;width=2100"
            alt="Don't Be Afraid To Stand Out | Be Bold | Uncommon James"
            srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Standout.jpg?v=1721661722&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Standout.jpg?v=1721661722&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Standout.jpg?v=1721661722&amp;width=2100 2100w"
            width="2100"
            height="2100"
            loading="lazy"
            sizes="(min-width: 1600px) 1005px, (min-width: 750px) 500px, calc(100vw - 30px)"
          />
        </AnchorTag>
        <AnchorTag href="/statement-pieces" className="flex col-start-3">
          <img
            src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=2100"
            alt="Dainty on the Daily | Shop Now | Uncommon James"
            srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=2100 2100w"
            width="2100"
            height="2100"
            loading="lazy"
            sizes="(min-width: 1600px) 1005px, (min-width: 750px) 500px, calc(100vw - 30px)"
          />
        </AnchorTag>
        <AnchorTag href="/dainty-jewelry" className="flex col-start-3">
          <img
            src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=2100"
            alt="Not Like The Others | Shop Warped Styles | Uncommon James"
            srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=2100 2100w"
            width="2100"
            height="2100"
            loading="lazy"
            sizes="(min-width: 1600px) 1005px, (min-width: 750px) 500px, calc(100vw - 30px)"
          />
        </AnchorTag>
      </div>
      {products && <ProductCarousel products={products} />}
    </main>
  );
}

export default Home;
