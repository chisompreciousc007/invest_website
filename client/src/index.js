import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL = "https://splashcash247.com/";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
