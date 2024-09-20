import PropTypes from "prop-types";

const ButtonTag = ({
  onClick,
  className = "",
  children,
  buttonType = "squared",
  ...props
}) => {
  if (buttonType === "rounded")
    return (
      <button
        type="button"
        onClick={onClick}
        className={`-:rounded-full -:text-sm -:px-5 -:py-2 -:hover:outline -:hover:outline-1 -:border -:border-solid -:transition-all -:duration-100 -:ease-linear -:hover:text-text-primary ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else if (buttonType === "icon")
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group -:p-1 -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else
    return (
      <button
        type="button"
        onClick={onClick}
        className={`-:text-center -:w-full -:px-5 -:py-[0.6rem] -:border -:border-solid -:hover:outline -:hover:outline-1 -:hover:text-text-primary -:text-sm -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
};

ButtonTag.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(["squared", "rounded", "icon"]),
};

export default ButtonTag;
