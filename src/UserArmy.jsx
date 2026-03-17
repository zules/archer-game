import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';

export default function UserArmy({units}) {
  return (
    <ArmyGrid direction="ltr" bgColor="bg-blue-500">
      {units.map((unit, i) => (
        unit ? <DisplayUnit key={unit.instanceId} unitData={unit} /> : <EmptyUnit key={i} />
      ))}
    </ArmyGrid>
  );
}