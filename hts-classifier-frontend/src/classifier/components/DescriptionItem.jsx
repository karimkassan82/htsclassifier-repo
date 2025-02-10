import classes from "./ClassifierHeader.module.css";
import Card from "../../shared/card/Card";

const DescriptionItem = (props) => {
  // Function to handle click and log htsNo, htsId, and description
  const handleClick = () => {
    // Call parent function (Classifier) to handle dynamic htsId creation and dynamicLevelId
    if (props.onItemSelect) {
      props.onItemSelect(
        props.htsNo,
        props.indent,
        props.description,
        props.headingId,
        props.uniqueIndex
      ); // Pass htsNo, htsId, htsNo2, and description to the parent
    }
  };

  return (
    <li className={classes.description_item} onClick={handleClick}>
      <Card className={classes.description_item_content}>
        <div className={classes.description_item_info}>
          <h2>{props.description}</h2>
        </div>
      </Card>
    </li>
  );
};

export default DescriptionItem;
