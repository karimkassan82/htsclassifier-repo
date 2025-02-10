import "../../shared/card/Card.css";

const MemoryCard = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default MemoryCard;
