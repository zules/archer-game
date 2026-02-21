import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';

export default function UserArmy({units}) {
  return (
    <ArmyGrid direction="ltr" bgColor="bg-blue-500">
      {units.map((unit) => (
        <DisplayUnit key={unit.instanceId} unitData={unit} />
      ))}
    </ArmyGrid>
  );
}