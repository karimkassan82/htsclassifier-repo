// import React from "react";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <section className={classes.header}>
      <header>
        <h1>HTS Classifier</h1>
        <p>US-HTS 10 Digits Search</p>
      </header>
    </section>
  );
};

export default Header;
