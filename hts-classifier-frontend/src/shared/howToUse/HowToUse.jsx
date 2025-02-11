import classes from "./HowToUse.module.css"; // Import CSS module

const HowToUse = () => {
  return (
    <main className={classes.how_to_use_container}>
      <h1>How to Use the HTS Classifier</h1>
      <p>
        The **HTS Classifier** is designed to help users easily determine the
        **Harmonized Tariff Schedule (HTS) code** for their items, following
        **U.S. Customs and Border Protection (CBP) guidelines**.
      </p>

      <h2>Step 1: Enter a Few Words</h2>
      <p>
        Simply type a **general description** of your item in the search bar.
        For example, if you are classifying **wooden furniture**, enter:
        <strong> "wooden chair" </strong> or **"oak table."**
      </p>

      <h2>Step 2: Select the Closest Description</h2>
      <p>
        The system will generate a list of **possible HTS classifications**.
        Choose the description that **best matches** your item.
      </p>

      <h2>Step 3: Continue Refining</h2>
      <p>
        If more details are needed, the classifier will **guide you step by
        step** through the appropriate **HTS structure**.
      </p>

      <h2>Step 4: Get Your HTS Code</h2>
      <p>
        Once the classification is complete, your **final HTS code** will be
        displayed. This is the code you will use for **import/export
        documentation**.
      </p>

      <h2>Why Use This Tool?</h2>
      <p>
        ✅ **Accurate:** Follows CBP classification guidelines. <br />
        ✅ **Fast:** Find your HTS code in just a few clicks. <br />✅
        **User-Friendly:** No deep tariff knowledge required—just enter a few
        words.
      </p>

      <p>
        Need additional guidance? Refer to the{" "}
        <a href="/privacy-policy">Privacy Policy</a> for more details on data
        use.
      </p>
    </main>
  );
};

export default HowToUse;
