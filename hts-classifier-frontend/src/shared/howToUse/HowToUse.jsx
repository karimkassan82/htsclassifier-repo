import { Link } from "react-router-dom";
import classes from "./HowToUse.module.css"; // Import CSS module

const HowToUse = () => {
  return (
    <main className={classes.how_to_use_container}>
      <h1>How to Use the HTS Classifier</h1>
      <p>
        The <strong>HTS Classifier</strong> is designed to help users easily
        determine the
        <strong> Harmonized Tariff Schedule (HTS) code </strong> for their
        items, following
        <strong> U.S. Customs and Border Protection (CBP) guidelines</strong>.
      </p>
      <h2>Step 1: Enter a Few Words</h2>
      <p>
        Simply type a <strong>general description</strong> of your item in the
        search bar. For example, if you are classifying{" "}
        <strong>wooden furniture</strong>, enter:
        <strong> "wooden chair" </strong> or <strong>"oak table."</strong>
      </p>
      <h2>Step 2: Select the Closest Description</h2>
      <p>
        The system will generate a list of{" "}
        <strong>possible HTS classifications</strong>. Choose the description
        that <strong>best matches</strong> your item.
      </p>
      <h2>Step 3: Continue Refining</h2>
      <p>
        If more details are needed, the classifier will{" "}
        <strong>guide you step by step</strong>
        through the appropriate <strong>HTS structure</strong>.
      </p>
      <h2>Step 4: Get Your HTS Code</h2>
      <p>
        Once the classification is complete, your{" "}
        <strong>final HTS code</strong> will be displayed. This is the code you
        will use for <strong>import/export documentation</strong>.
      </p>
      <h2>Why Use This Tool?</h2>
      <p>
        ✅ <strong>Accurate:</strong> Follows CBP classification guidelines.{" "}
        <br />✅ <strong>Fast:</strong> Find your HTS code in just a few clicks.{" "}
        <br />✅ <strong>User-Friendly:</strong> No deep tariff knowledge
        required—just enter a few words.
      </p>
      <p>
        Need additional guidance? Refer to the{" "}
        <Link to="/privacy-policy">Privacy Policy</Link> for more details on
        data use.
      </p>
    </main>
  );
};

export default HowToUse;
