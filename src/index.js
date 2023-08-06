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
      <title>TopBeat - Discover your top song and artist</title>
    </Helmet>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

serviceWorker.unregister();
