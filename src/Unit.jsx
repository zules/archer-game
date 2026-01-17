export default function Unit(props) {
    return (
        <div className={`unit ${props.id}`}>
            <p>{props.name}</p>
        </div>
    );
}