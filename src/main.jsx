import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM ? -> virtual dom that react builds?
import App from "./App.jsx";
import "./index.css";

// here it sets the root of the ReactDOM
// equal to the root element defined in ../index.html
// within this ReactDOM root we render <App />
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
