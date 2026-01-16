export default function Unit(props) {
    return (
        <div className="unit" id={props.id}>
            <p>Unit: {props.id}</p>
            <p>{props.name}</p>
        </div>
    );
}