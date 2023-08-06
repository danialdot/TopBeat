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
      <meta property="og:title" content="TopBeat" />
      <meta property="og:description" content="Discover your top song and artist" />
      <meta property="og:image" content="https://topbeat.danials.space/og-image.jpg" />
      <meta property="og:url" content="https://topbeat.danials.space" />
      <meta name="twitter:card" content="summary_large_image" />
      <title>TopBeat</title>
    </Helmet>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

serviceWorker.unregister();
