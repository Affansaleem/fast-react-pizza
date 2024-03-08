import { Link } from "react-router-dom";
import Search from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-yellow-500 uppercase px-4 py-3 border-b-4 border-stone-200 sm:px-6 flex items-center justify-between">
      <Link to={"/"} className="tracking-widest">
        FAST REACT PIZZA & CO.
      </Link>
      <Search />
      <Username />
    </header>
  );
}

export default Header;
