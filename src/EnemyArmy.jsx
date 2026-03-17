import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';

export default function EnemyArmy({units}) {
  return (
    <ArmyGrid direction="rtl" bgColor="bg-red-500">
      {units.map((unit, i) => (
        unit ? <DisplayUnit key={unit.instanceId} unitData={unit} isEnemy={true} /> : <EmptyUnit key={i} />
      ))}
    </ArmyGrid>
  );
}