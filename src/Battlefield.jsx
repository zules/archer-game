import DisplayUnit from './DisplayUnit.jsx';

export default function Battlefield(props) {
    console.log("Battlefield units:", props.units);

    return (
        <div className={props.className}>
            {props.units?.map((id, index) => (
                <DisplayUnit key={`${props.className}-${index}`} id={id} />
            ))}
        </div>
    )
}