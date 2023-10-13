import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM ? -> virtual dom that react builds?
import "./index.css";
// importing routers setup func from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
// build router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

// here it sets the root of the ReactDOM
// equal to the root element defined in ../index.html
// within this ReactDOM root we render <App />
// root renders App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
