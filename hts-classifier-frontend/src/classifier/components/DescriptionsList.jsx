import DescriptionItem from "./DescriptionItem";
import classes from "./DescriptionsList.module.css";

const DescriptionsList = (props) => {
  return (
    <ul className={classes.descriptions_list}>
      {props.items.map((item) => (
        <DescriptionItem
          key={item._id}
          htsNo={item.htsNo}
          indent={item.indent}
          description={item.description}
          headingId={item.headingId}
          uniqueIndex={item.uniqueIndex}
          onItemSelect={props.onItemSelect} // Pass onItemSelect to DescriptionItem
          mode={props.mode}
        />
      ))}
    </ul>
  );
};

export default DescriptionsList;
