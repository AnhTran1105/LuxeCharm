function Button({ onClick, content, icon, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} border border-solid flex items-center justify-center p-3 hover:outline outline-1 text-[15px]`}
    >
      {icon}
      <span>{content}</span>
    </button>
  );
}

export default Button;
