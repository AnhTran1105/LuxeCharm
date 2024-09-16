import { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import axios from "../utils/axios";

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
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <img
        src="https://uncommonjames.com/cdn/shop/files/SterlingSilver_Sept24_Hero_Desktop.jpg?v=1725976472&width=2100"
        alt=""
        loading="lazy"
        className="w-full"
      />
      <div className="py-3 my-4">
        {products && (
          <ProductCarousel products={getRandomProducts(products, 5)} />
        )}
      </div>

      <a href="/collections/broadway-nights-collection" className="flex">
        <img
          src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=2100"
          alt=""
          srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_Hero_Desktop.jpg?v=1721661493&amp;width=2100 2100w"
          width="2100"
          height="1050.0"
          loading="lazy"
          sizes="(min-width: 750px) 50vw, 100vw"
        />
      </a>
      {/* End Banner */}
      {/* Product Types */}
      <div className="py-3 my-4">
        <div className="grid grid-cols-4 gap-3 px-[15px]">
          <a href="/collections/necklaces" className="group cursor-pointer">
            <div className="m-5 overflow-hidden">
              <img
                className="group-hover:scale-103 aspect-square transition-transform duration-300 ease-linear"
                srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571 360w"
                src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Necklaces.jpg?v=1721661571&amp;width=1500"
                sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                alt=""
                height="360"
                width="360"
                loading="lazy"
              />
            </div>
            <div className="pt-[10px] pb-[17px] text-center">
              <span>Necklaces</span>
            </div>
          </a>
          <a href="/collections/earrings" className="group cursor-pointer">
            <div className="m-5 overflow-hidden">
              <img
                className="group-hover:scale-103 aspect-square transition-transform duration-300 ease-linear"
                srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582 360w
                "
                src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Earrings.jpg?v=1721661582&amp;width=1500"
                sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                alt=""
                height="360"
                width="360"
                loading="lazy"
              />
            </div>
            <div className="pt-[10px] pb-[17px] text-center">
              <span>Earrings</span>
            </div>
          </a>
          <a href="/collections/rings" className="group cursor-pointer">
            <div className="m-5 overflow-hidden">
              <img
                className="group-hover:scale-103 aspect-square transition-transform duration-300 ease-linear"
                srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594 360w
                "
                src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Rings.jpg?v=1721661594&amp;width=1500"
                sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                alt=""
                height="360"
                width="360"
                loading="lazy"
              />
            </div>
            <div className="pt-[10px] pb-[17px] text-center">
              <span>Rings</span>
            </div>
          </a>
          <a href="/collections/bracelets" className="group cursor-pointer">
            <div className="m-5 overflow-hidden">
              <img
                className="group-hover:scale-103 aspect-square transition-transform duration-300 ease-linear"
                srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=330 330w,//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604 360w
                "
                src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_JewelryCarousel_Bracelets.jpg?v=1721661604&amp;width=1500"
                sizes="
                  (min-width: 1600px) 500px,
                  (min-width: 750px) calc((100vw - 10rem) / 2),
                  calc(100vw - 3rem)"
                alt=""
                height="360"
                width="360"
                loading="lazy"
              />
            </div>
            <div className="pt-[10px] pb-[17px] text-center">
              <span>Bracelets</span>
            </div>
          </a>
        </div>
      </div>
      {/* End Products Types */}
      {/* Banner */}
      <a href="/collections/bestsellers" className="flex">
        <img
          src="//uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=2100"
          alt=""
          srcSet="//uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/BestSellers_Apr24_Hero_Desktop.jpg?v=1712326654&amp;width=2100 2100w"
          width="2100"
          height="1050.0"
          loading="lazy"
          sizes="(min-width: 750px) 50vw, 100vw"
        />
      </a>
      {/* End Banner */}
      {/* Products */}
      {/* <ProductCarousel /> */}
      {/* End Products */}
      {/* Banner */}
      <div className="pt-7 px-[50px] grid grid-cols-3 gap-3">
        <a
          href="/collections/statement-pieces"
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
        </a>
        <a href="/collections/statement-pieces" className="flex col-start-3">
          <img
            src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=2100"
            alt="Dainty on the Daily | Shop Now | Uncommon James"
            srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Dainty.jpg?v=1721661689&amp;width=2100 2100w"
            width="2100"
            height="2100"
            loading="lazy"
            sizes="(min-width: 1600px) 1005px, (min-width: 750px) 500px, calc(100vw - 30px)"
          />
        </a>
        <a href="/collections/dainty-jewelry" className="flex col-start-3">
          <img
            src="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=2100"
            alt="Not Like The Others | Shop Warped Styles | Uncommon James"
            srcSet="//uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=550 550w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=1100 1100w, //uncommonjames.com/cdn/shop/files/Fall1_Jul24_CollectionBanner_Warped.jpg?v=1721661760&amp;width=2100 2100w"
            width="2100"
            height="2100"
            loading="lazy"
            sizes="(min-width: 1600px) 1005px, (min-width: 750px) 500px, calc(100vw - 30px)"
          />
        </a>
      </div>
      {/* End Banner */}
    </div>
  );
}

export default Home;
