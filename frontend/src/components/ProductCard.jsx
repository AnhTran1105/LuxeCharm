function ProductCard({ isOptional = false, isOff = false }) {
  return (
    <li className="group cursor-pointer relative">
      <div className="relative overflow-hidden">
        <img
          srcSet="//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=360 360w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=533 533w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=720 720w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=940 940w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=1066 1066w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240 2251w
                  "
          src="//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-1.jpg?v=1722020240&amp;width=533"
          sizes="(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
          alt="Hard Feelings Eau De Parfum"
          loading="lazy"
          width="2251"
          height="3000"
          className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
        />
        <img
          srcSet="//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=165 165w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=360 360w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=533 533w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=720 720w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=940 940w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=1066 1066w,//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240 2251w"
          src="//uncommonjames.com/cdn/shop/files/S01-HARDFEELINGSFRAG-50ml-2.jpg?v=1722020240&amp;width=533"
          sizes="(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)"
          alt=""
          loading="lazy"
          width="2251"
          height="3000"
          className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[400ms] ease-linear"
        ></img>
      </div>
      {isOff && (
        <div className="absolute top-0 left-0">
          <div className="p-[10px]">
            <div className="bg-badge-background pt-[5px] pb-[6px] px-[12px] flex justify-center items-center border border-badge-background rounded-full text-xs leading-[1]">
              <span className="mb-[-3px]">27% Off</span>
            </div>
          </div>
        </div>
      )}
      <div className="py-[10px] pb-[17px] text-center text-sm">
        <h3>
          <a href="/" className="group-hover:underline underline-offset-3px">
            Hard Feelings Eau De Parfum
          </a>
        </h3>
        <div>
          <div className="mt-[7px]">
            <span>$72.00</span>
          </div>
        </div>
      </div>
      <button className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 text-[15px]">
        <span>{isOptional ? "Choose options" : "Add to cart"}</span>
      </button>
    </li>
  );
}

export default ProductCard;
