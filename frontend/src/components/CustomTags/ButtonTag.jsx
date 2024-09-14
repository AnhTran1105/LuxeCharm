import PropTypes from "prop-types";

const ButtonTag = ({
  onClick,
  className = "",
  children,
  type = "squared",
  ...props
}) => {
  if (type === "rounded")
    return (
      <button
        onClick={onClick}
        className={`-:rounded-full -:text-sm -:px-5 -:py-2 -:hover:outline -:hover:outline-1 -:border -:border-solid -:transition-all -:duration-100 -:ease-linear -:hover:text-text-primary ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else if (type === "icon")
    return (
      <button
        onClick={onClick}
        className={`-:p-1 -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else
    return (
      <button
        onClick={onClick}
        className={`-:text-center -:w-full -:px-5 -:py-3 -:border -:border-solid -:hover:outline -:hover:outline-1 -:hover:text-text-primary -:text-[15px] -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
};

ButtonTag.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["squared", "rounded", "icon"]),
};

export default ButtonTag;
