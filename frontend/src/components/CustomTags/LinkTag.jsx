import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkTag = ({
  type = "no-underline",
  to,
  className = "",
  children,
  ...props
}) => {
  return (
    <Link
      to={to}
      type={type}
      relative="path"
      className={`-:text-text-secondary -:text-sm -:hover:text-text-primary -:transition-all -:duration-100 -:ease-linear -:hover:underline -:hover:underline-offset-2 ${
        type === "underline" &&
        "underline underline-offset-2 hover:decoration-2"
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

LinkTag.propTypes = {
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["no-underline", "underline"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default LinkTag;
