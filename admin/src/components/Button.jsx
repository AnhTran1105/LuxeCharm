function Button({ onClick, content, icon, className }) {
  return (
    <button
      onClick={onClick}
      className={`border border-solid flex items-center justify-center p-3 hover:outline outline-1 transition-[outline] duration-100 ease-linear text-[15px] ${className}`}
    >
      {icon && <i className="mr-2 flex justify-center items-center">{icon}</i>}
      <span>{content}</span>
    </button>
  );
}

export default Button;
