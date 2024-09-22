import PropTypes from "prop-types";

const ButtonTag = ({
  onClick,
  className = "",
  children,
  buttonType = "squared",
  disabled = false,
  ...props
}) => {
  if (buttonType === "rounded")
    return (
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : "-:hover:outline -:hover:outline-1 -:hover:text-text-primary"
        } -:rounded-full -:text-sm -:px-5 -:py-2 -:border -:border-solid -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else if (buttonType === "icon")
    return (
      <button
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`${
          disabled ? "opacity-30 cursor-not-allowed" : "group"
        } -:p-1 -:transition-all -:duration-100 -:ease-linear ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  else
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : "-:hover:outline -:hover:outline-1 -:hover:text-text-primary"
        } -:text-center -:w-full -:px-5 -:py-3 -:border -:border-solid -:text-[0.95rem] -:transition-all -:duration-100 -:ease-linear ${className}`}
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
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(["squared", "rounded", "icon"]),
};

export default ButtonTag;
