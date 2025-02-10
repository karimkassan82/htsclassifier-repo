// import React, { useState } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>HTS Classifier</div>
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            HTS Classifier
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
