import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 全局错误处理
window.addEventListener(
  "error",
  function (event) {
    if (
      event.error &&
      event.error.message &&
      event.error.message.includes(
        "isDragging"
      )
    ) {
      event.preventDefault();
      return false;
    }
  }
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
