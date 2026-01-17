import DisplayUnit from './DisplayUnit.jsx';

export default function Battlefield({className, units}) {

    return (
        <div className={className}>
            {units.map((unit) => (
                console.log(unit) || <DisplayUnit key={`${unit.instanceId}`} unitData={unit} />
            ))}
        </div>
    )
}