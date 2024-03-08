import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemCount, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="ga-1 flex items-center md:gap-3">
      <Button onClick={() => dispatch(decreaseItemCount(pizzaId))} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
