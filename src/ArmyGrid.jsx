import DisplayUnit from './DisplayUnit.jsx';

export default function ArmyGrid({className, units}) {

    return (
        <div className={className}>
            {units.map((unit) => (
                <DisplayUnit key={`${unit.instanceId}`} unitData={unit} />
            ))}
        </div>
    )
}