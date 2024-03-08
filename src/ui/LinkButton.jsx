import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const className = "text-blue-500 text-sm hover:text-blue-600 hover:underline";
  const navigate = useNavigate();
  if (to === "-1") {
    <button className={className} onClick={() => navigate(-1)}>
      {children}
    </button>;
    return;
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
