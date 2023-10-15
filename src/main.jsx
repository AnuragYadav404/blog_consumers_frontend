import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM ? -> virtual dom that react builds?
import "./index.css";
// importing routers setup func from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
// import error page for root route
import ErrorPage from "./error-page";
import EditContact, { action as editArticleAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
// import contact component
import Contact, { loader as articleLoader } from "./routes/contact";
// build router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "articles/:articleId",
        element: <Contact />,
        loader: articleLoader,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "articles/:articleId/edit",
        element: <EditContact />,
        loader: articleLoader,
        action: editArticleAction,
      },
      {
        path: "articles/:articleId/destroy",
        action: destroyAction,
        errorElement: <ErrorPage />,
      },
    ],
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
