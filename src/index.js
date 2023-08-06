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
      <meta property="og:title" content="TopBeat - Discover your top song and artist" />
      <meta
        property="og:description"
        content="Connect your Spotify account to TopBeat and discover your most-played track and artist."
      />
      <meta property="og:image" content="https://topbeat.danials.space/og-image.png" />
      <meta property="og:url" content="https://topbeat.danials.space" />
      <meta property="og:type" content="website" />

      <title>TopBeat - Discover your top song and artist</title>
    </Helmet>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

serviceWorker.unregister();
