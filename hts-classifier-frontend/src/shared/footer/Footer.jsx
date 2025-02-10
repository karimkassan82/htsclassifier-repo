import classes from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className={classes.footer}>
      <p>All rights reserved &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
