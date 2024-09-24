import { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import axios from "../utils/axios";
import AnchorTag from "../components/CustomTags/AnchorTag";
import FirstBanner from "../assets/images/FirstBanner.webp";
import SecondBanner from "../assets/images/SecondBanner.webp";
import ThirdBanner from "../assets/images/ThirdBanner.webp";
import RingsBanner from "../assets/images/RingsBanner.webp";
import BraceletsBanner from "../assets/images/BraceletsBanner.jpg";
import NecklacesBanner from "../assets/images/NecklacesBanner.webp";
import EarringsBanner from "../assets/images/EarringsBanner.webp";
import DaintyBanner from "../assets/images/DaintyBanner.webp";
import StandoutBanner from "../assets/images/StandoutBanner.webp";
import WarpedBanner from "../assets/images/WarpedBanner.webp";

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
        <img src={FirstBanner} alt="" loading="lazy" className="w-full" />
      </AnchorTag>

      {products && (
        <ProductCarousel products={getRandomProducts(products, 5)} />
      )}

      <AnchorTag href="/all-jewelry" className="flex">
        <img
          src={SecondBanner}
          alt="banner"
          loading="lazy"
          className="w-full"
        />
      </AnchorTag>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AnchorTag href="/necklaces" className="group cursor-pointer">
          <div className="overflow-hidden">
            <img
              className="group-hover:scale-105 aspect-square transition-transform duration-300 ease-linear w-full"
              src={NecklacesBanner}
              alt="necklaces"
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
              src={EarringsBanner}
              alt="earrings"
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
              src={RingsBanner}
              alt="rings"
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
              src={BraceletsBanner}
              alt="bracelets"
              loading="lazy"
            />
          </div>
          <div className="pt-3 text-center text-base">
            <span>Bracelets</span>
          </div>
        </AnchorTag>
      </div>

      <AnchorTag href="/bestsellers" className="flex">
        <img src={ThirdBanner} alt="banner" loading="lazy" className="w-full" />
      </AnchorTag>

      <div className="grid grid-cols-3 gap-3">
        <AnchorTag
          href="/statement-pieces"
          className="flex col-start-1 col-span-2 row-span-2"
        >
          <img src={StandoutBanner} alt="standout" loading="lazy" />
        </AnchorTag>
        <AnchorTag href="/statement-pieces" className="flex col-start-3">
          <img src={DaintyBanner} alt="dainty" loading="lazy" />
        </AnchorTag>
        <AnchorTag href="/dainty-jewelry" className="flex col-start-3">
          <img src={WarpedBanner} alt="warped" loading="lazy" />
        </AnchorTag>
      </div>
      {products && <ProductCarousel products={products} />}
    </main>
  );
}

export default Home;
