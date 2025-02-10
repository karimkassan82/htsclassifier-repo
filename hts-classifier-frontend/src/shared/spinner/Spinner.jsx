import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}></div>
      <p className={classes.searchingText}>Searching...</p>
    </div>
  );
};

export default Spinner;
