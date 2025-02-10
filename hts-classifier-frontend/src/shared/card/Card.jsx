import "./Card.css";

const Card = (props) => {
  // Make sure the Card handles onClick properly and passes it to the parent
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event); // Pass the click event back to the parent
    }
  };

  return (
    <div
      className={`card ${props.className}`}
      style={props.style}
      onClick={handleClick} // Ensure onClick is properly passed and handled
    >
      {props.children}
    </div>
  );
};

export default Card;
