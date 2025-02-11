import logo from "../../assets/Classifier-front-logo.webp";
import classes from "../components/ClassifierHeader.module.css";

const ClassifierHeader = () => {
  return (
    <header className={classes.classifier_header}>
      <img src={logo} alt="Logo of the classifier" />
      <h1>HTS Classifier - Find Your US 10 digits Tariff Code Easily</h1>
      <p>Your guide for proper US HTS classification</p>
    </header>
  );
};

export default ClassifierHeader;
