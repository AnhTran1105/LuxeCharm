import PropTypes from "prop-types";

const ButtonTag = ({ onClick, className = "", children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full text-base px-5 py-2 border border-solid border-border-secondary hover:border-border-primary transition-all duration-100 ease-linear text-text-secondary hover:text-text-primary ${className}`}
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
};

export default ButtonTag;
