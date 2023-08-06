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
      <title>TopBeat - Discover your top song and artist</title>

      {/* Meta Tags for Social Media Link Preview */}
      <meta
        name="description"
        content="Connect your Spotify account to TopBeat and discover your most-played track and artist."
      />
      <meta property="og:title" content="TopBeat - Discover your top song and artist" />
      <meta
        property="og:description"
        content="Connect your Spotify account to TopBeat and discover your most-played track and artist."
      />
      <meta property="og:image" content="https://topbeat.danials.space/og-image.png" />
      <meta property="og:url" content="https://topbeat.danials.space" />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content="TopBeat - Discover your top song and artist" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TopBeat - Discover your top song and artist" />
      <meta
        name="twitter:description"
        content="Connect your Spotify account to TopBeat and discover your most-played track and artist."
      />
      <meta name="twitter:image" content="https://topbeat.danials.space/og-image.png" />
      <meta name="twitter:url" content="https://topbeat.danials.space" />
    </Helmet>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);

serviceWorker.unregister();
