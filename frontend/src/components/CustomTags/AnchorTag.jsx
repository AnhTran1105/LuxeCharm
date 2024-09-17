import PropTypes from "prop-types";

const AnchorTag = ({
  type = "no-underline",
  href,
  className = "",
  children,
  ...props
}) => {
  return (
    <a
      href={href}
      type={type}
      className={`-:text-text-secondary -:text-sm -:hover:text-text-primary -:transition-all -:duration-100 -:ease-linear -:hover:underline -:hover:underline-offset-2 ${
        type === "underline" &&
        "underline underline-offset-2 hover:decoration-2"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

AnchorTag.propTypes = {
  href: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["no-underline", "underline"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AnchorTag;
