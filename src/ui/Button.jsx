import { Link } from "react-router-dom";

function Button({ children, disable, to, type, onClick }) {
  const className =
    "focus: focus: p sm: inline-block rounded-lg bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 outline-none ring-offset-2 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 disabled:cursor-all-scroll sm:px-6 sm:py-4";

  const base =
    "focus: focus: p sm: inline-block rounded-lg bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 outline-none ring-offset-2 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 disabled:cursor-all-scroll ";
  const styles = {
    primary: base + "px-4 py-3 sm:px-6 sm:py-4",
    small: base + "px-4 py-2 md-px-5 md:py-2.5 text-xs",
    round: base + " md:rounded-full px-2 py-1 md:px-3 md:py-1 text-sm",
    secondary:
      "inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disable} className={styles[type]}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disable} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
