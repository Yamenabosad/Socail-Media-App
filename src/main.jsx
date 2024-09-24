import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Home from "./pages/Home";
import Users from "./pages/Users";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
