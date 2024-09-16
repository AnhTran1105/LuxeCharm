import { WarningIcon } from "./SVG";

function ErrorMessage({ message }) {
  return (
    <p className="text-left px-4 pt-2 flex items-center">
      <WarningIcon width={20} height={20} />
      <span className="first-letter:capitalize">{message}</span>
    </p>
  );
}

export default ErrorMessage;
