import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalItemQuantity = useSelector(getTotalQuantity);
  const totalPriceQuantity = useSelector(getTotalPrice);
  if (!totalItemQuantity) return;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 p-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalItemQuantity} pizzas</span>
        <span>{formatCurrency(totalPriceQuantity)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
