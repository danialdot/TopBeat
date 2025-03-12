import React from "react";
import { useNavigate } from "react-router-dom";
import "./policy.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="policy-container">
      <header className="policy-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="title">Privacy Policy</h1>
      </header>

      <div className="scroll-content">
        <p className="paragraph">
          Your privacy is our top priority. This policy explains how our
          application works as an interface between your device and Spotify's
          services, without collecting or storing any of your data.
        </p>

        <section className="section">
          <h2 className="section-title">1. No Data Collection</h2>
          <p className="paragraph">
            We want to be absolutely clear about our data practices:
          </p>
          <ul className="bullet-list">
            <li className="check-item">
              We do not collect any personal information
            </li>
            <li className="check-item">
              We do not store any user data on our servers
            </li>
            <li className="check-item">
              We do not track your usage or behavior
            </li>
          </ul>
          <p className="paragraph">
            This application functions solely as an interface between your
            device and Spotify's servers.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">2. How It Works</h2>
          <p className="paragraph">
            Our application operates on these principles:
          </p>
          <ul className="bullet-list">
            <li className="check-item">
              All operations happen directly between your device and Spotify
            </li>
            <li className="check-item">
              Authentication is handled entirely by Spotify's secure system
            </li>
            <li className="check-item">No data passes through our servers</li>
          </ul>
        </section>

        <section className="section">
          <h2 className="section-title">3. Local Device Storage</h2>
          <p className="paragraph">
            The only data stored locally on your device includes:
          </p>
          <ul className="bullet-list">
            <li className="bullet-item">
              Spotify's authentication token (managed by Spotify's SDK)
            </li>
            <li className="bullet-item">
              Temporary cache for better performance (automatically managed by
              your browser)
            </li>
          </ul>
        </section>

        <section className="section">
          <h2 className="section-title">4. Spotify Integration</h2>
          <p className="paragraph">When you use our application:</p>
          <ul className="bullet-list">
            <li className="bullet-item">
              Playlist management is handled directly with Spotify's API
            </li>
            <li className="bullet-item">
              Your Spotify credentials are never seen or stored by us
            </li>
          </ul>
        </section>

        <section className="section">
          <h2 className="section-title">5. Your Data Rights</h2>
          <p className="paragraph">
            Since we don't collect any data, there's nothing for us to share,
            sell, or manage. All your data remains between you and Spotify.
          </p>
          <p className="paragraph">
            For information about how Spotify handles your data, please refer to
            Spotify's privacy policy.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">6. Updates to Privacy Policy</h2>
          <p className="paragraph">
            While we may update this policy to reflect changes in our
            application's functionality, our core principle of not collecting
            user data will remain unchanged.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
