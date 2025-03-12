import React from "react";
import { useNavigate } from "react-router-dom";
import "./terms.css";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <header className="terms-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="title">Terms of Service</h1>
      </header>

      <div className="scroll-content">
        <p className="paragraph">
          Welcome to our Spotify App. By accessing and using this application,
          you agree to these terms and conditions. If you do not agree with
          these terms, please do not use this service.
        </p>

        <section className="section">
          <h2 className="section-title">1. Use of Service</h2>
          <p className="paragraph">
            This application provides a local interface for interacting with
            Spotify's services. All operations happen directly between your
            device and Spotify's servers.
          </p>
          <p className="paragraph">
            You must have a valid Spotify account and comply with Spotify's
            terms of service to use this application.
          </p>
          <p className="paragraph">
            You are responsible for maintaining the security of your Spotify
            account credentials and any activity that occurs under your account.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">2. Data & Privacy</h2>
          <p className="paragraph">
            We do not collect, store, or process any of your personal data. This
            application serves as a direct interface between your device and
            Spotify's servers.
          </p>
          <p className="paragraph">
            Any data exchange happens directly between your local device and
            Spotify's servers through their official API. We do not have access
            to or store any of this information.
          </p>
          <p className="paragraph">
            Your Spotify authentication and data remain strictly between you and
            Spotify.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">3. Limitations & Liability</h2>
          <p className="paragraph">
            This service is provided "as is" without any warranties, express or
            implied.
          </p>
          <p className="paragraph">
            As we don't collect or store any data, we are not responsible for
            any data-related issues between your device and Spotify's services.
          </p>
          <p className="paragraph">
            We reserve the right to modify or discontinue any feature or the
            entire service at any time.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">4. Content Guidelines</h2>
          <p className="paragraph">
            Users must respect intellectual property rights and only use the
            application for legal purposes in accordance with Spotify's terms.
          </p>
          <p className="paragraph">
            All content is streamed directly from Spotify's servers, and we do
            not store or modify any content locally except for temporary caching
            as required by Spotify's API.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">5. Changes to Terms</h2>
          <p className="paragraph">
            We may update these terms from time to time. Continued use of the
            application after changes constitutes acceptance of the modified
            terms.
          </p>
          <p className="paragraph">
            Users will be notified of significant changes to these terms through
            the application interface.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
