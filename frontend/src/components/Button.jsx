function Button({ className, title, onClick, svgIcon, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-center w-full border border-solid h-[45px] text-[15px] hover:bg-hover hover:text-white transition-all duration-100 ease-in ${className}`}
    >
      {title}
      {svgIcon}
    </button>
  );
}

export default Button;
