import HeaderAd from "../headerAd/HeaderAd";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <section className={classes.header}>
      <header>
        <h1>HTS Classifier</h1>
        <p>US-HTS 10 Digits Search</p>
        <HeaderAd /> {/* ✅ Ad will appear under the header */}
      </header>
    </section>
  );
};

export default Header;
