function Button({ className, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-center w-full border border-solid h-[45px] text-[15px] hover:bg-hover hover:text-white transition-all duration-100 ease-in ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
