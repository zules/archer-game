import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';

export default function EnemyArmy({units}) {
  return (
    <ArmyGrid direction="rtl" bgColor="bg-red-500">
      {units.map((unit) => (
        <DisplayUnit key={unit.instanceId} unitData={unit} />
      ))}
    </ArmyGrid>
  );
}