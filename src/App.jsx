import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Cart from "../src/features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "../src/features/order/CreateOrder";
import Order, { loader as orderLoader } from "../src/features/order/Order";
import Menu, { loader as menuLoader } from "../src/features/menu/Menu";
import Error from "./ui/Error";
import { action as updateOrderAction } from "../src/features/order/UpdateOrder";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
