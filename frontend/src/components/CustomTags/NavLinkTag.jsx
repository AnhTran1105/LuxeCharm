import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavAnchorTag = ({ to, className = "", children, ...props }) => {
  return (
    <NavLink
      href={to}
      relative="path"
      className={`text-text-secondary hover:text-text-primary transition-all duration-100 ease-linear hover:underline hover:underline-offset-2 ${className}`}
      {...props}
    >
      {children}
    </NavLink>
  );
};

NavAnchorTag.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavAnchorTag;
