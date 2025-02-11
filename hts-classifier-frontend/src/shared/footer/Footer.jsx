import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <p>
        All rights reserved &copy; {currentYear} |{" "}
        <Link to="/how-to-use" className={classes.footer_link}>
          How to Use
        </Link>{" "}
        |{" "}
        <Link to="/privacy-policy" className={classes.footer_link}>
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
