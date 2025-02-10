import logo from "../../assets/Classifier-front-logo.webp";
import classes from "../components/ClassifierHeader.module.css";

const ClassifierHeader = () => {
  return (
    <header className={classes.classifier_header}>
      <img src={logo} alt="Logo of the classifier" />
      <h1>Welcome To The US HTS Code Classifier</h1>
      <p>Your guide for proper US HTS classification</p>
    </header>
  );
};

export default ClassifierHeader;
