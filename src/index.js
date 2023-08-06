import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>TopBeat</title>
    </Helmet>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

serviceWorker.unregister();
