import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkTag = ({ to, className = "", children, ...props }) => {
  return (
    <Link
      to={to}
      relative="path"
      className={`-:text-text-secondary -:text-sm -:hover:text-text-primary -:transition-all -:duration-100 -:ease-linear -:hover:underline -:hover:underline-offset-2 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

LinkTag.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default LinkTag;
