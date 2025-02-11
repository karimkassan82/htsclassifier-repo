import classes from "./PrivacyPolicy.module.css"; // Import CSS module

const PrivacyPolicy = () => {
  return (
    <main className={classes.privacy_container}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated: [02/01/2025]</strong>
      </p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>HTS Classifier</strong>. Your privacy is important to
        us. This Privacy Policy explains how we collect, use, and protect your
        information.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> (e.g., name, email) if you
          contact us.
        </li>
        <li>
          <strong>Usage Data:</strong> (e.g., pages visited, search queries)
          through analytics.
        </li>
        <li>
          <strong>Cookies & Tracking:</strong> Used for ads and performance
          tracking.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>Improve our service and user experience.</li>
        <li>Show relevant ads via Google AdSense.</li>
        <li>Analyze website performance and traffic.</li>
      </ul>

      <h2>4. Third-Party Services</h2>
      <p>
        We use third-party services like Google AdSense and analytics tools,
        which may collect data as described in their respective policies.
      </p>

      <h2>5. Your Choices</h2>
      <p>
        - You can disable cookies via your browser settings. <br />- You can opt
        out of personalized ads via Google’s{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ad Settings
        </a>
        .
      </p>

      <h2>6. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        posted here.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions, contact us at{" "}
        <strong>[mhassa46@uic.edu]</strong>.
      </p>
    </main>
  );
};

export default PrivacyPolicy;
