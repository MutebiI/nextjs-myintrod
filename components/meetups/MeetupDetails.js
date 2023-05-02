import classes from "./MeetupDetail.module.css";
function MeetupDetails(props) {
  return (
    <div>
      <div className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default MeetupDetails;
