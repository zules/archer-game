import Unit from './Unit.jsx';
import { UNIQUES } from './uniques';

const unitLookup = new Map(UNIQUES);

export default function Army(props) {     

    const unitsOnBoard = props.className === "enemy army"
        //First we place enemies
        ? ["01", "01", "01", "01", "01", "01", "01", "01", "01"]
        //Then we place user units
        : ["02", "03", "02", "03", "02", "03", "02", "03", "01"];

    return (
        <div className={props.className}>
        {unitsOnBoard.map((id) => {
            const unitData = unitLookup.get(id);
            return <Unit className={id} name={unitData.name} />;
        })}
        </div>
    )
}