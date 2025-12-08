import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import routes from "./route";
import { Provider } from "react-redux";
import { store } from "./store";
import GlobalErrorHandler from "./components/GlobalErrorHandler";

const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalErrorHandler />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
