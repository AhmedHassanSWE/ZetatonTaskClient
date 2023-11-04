import { BiLoaderAlt } from "react-icons/bi";

function LoadingButton({ loading, className, children }) {
  return <button className={className}>{loading ? <BiLoaderAlt className="spinner" /> : children}</button>;
}

export default LoadingButton;
