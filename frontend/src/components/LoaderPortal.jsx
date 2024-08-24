import ReactDOM from "react-dom";

const LoaderPortal = ({ children }) => {
  const loaderRoot = document.getElementById("loader-root");

  if (!loaderRoot) return null;

  return ReactDOM.createPortal(children, loaderRoot);
};

export default LoaderPortal;
