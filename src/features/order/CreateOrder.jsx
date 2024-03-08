// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../../features/cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const formErrors = useActionData();
  // const userName = useSelector((state) => state.user.userName);
  const totalItemPrice = useSelector(getTotalPrice);
  const [withPriority, setwithPriority] = useState(false);
  // console.log(totalItemPrice);
  const { userName, status, position, address, error } = useSelector(
    (state) => state.user,
  );
  const isLoadingAddress = status === "loading"; // truewhen fetcing adddress
  const priorityPrice = withPriority ? totalItemPrice * 0.2 : 0;
  const totalPrice = totalItemPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="mb-3 grow rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>
        <div className="flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="mb-3 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
              type="tel"
              name="phone"
              placeholder="Phone No..."
              required
            />
            {formErrors?.phone && (
              <p className="text-red mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              className="mb-3 w-full rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
              type="text"
              name="address"
              placeholder="Address..."
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {status === "error" && (
              <p className="text-red absolute left-0 top-full rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[5px] z-50 mt-1.5">
                <Button
                  disabled={isLoadingAddress}
                  type={"small"}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Address
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 mt-3 flex items-center gap-5">
          <input
            className="h-6 w-6  accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setwithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={
              position.longitude
                ? ` ${position.latitude},${position.longitude}`
                : ""
            }
            name="position"
          />
          <Button type="small" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Submitting..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give a valid phone# we might need this to contact you";
  }
  if (Object.keys(errors).length > 0) return errors; // if their is a single errorthen return this object of erros otherwise the order array

  const newOrder = await createOrder(order); // at this the order is submitted to the api
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
