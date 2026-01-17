import DisplayUnit from './DisplayUnit.jsx';

export default function Battlefield(props) {

    return (
        <div className={props.className}>
            {props.units.map((unit) => (
                <DisplayUnit key={`${unit.instanceId}`} unitData={unit} />
            ))}
        </div>
    )
}