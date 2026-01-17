import Unit from './Unit.jsx';

export default function Army(props) {     

    const unitsOnBoard = props.className === "enemy army"
        //First we place enemies
        ? ["01", "01", "01", "01", "01", "01", "01", "01", "01"]
        //Then we place user units
        : ["02", "03", "02", "03", "02", "03", "02", "03", "01"];

    return (
        <div className={props.className}>
            {unitsOnBoard.map((id, index) => (
                <Unit key={`${props.className}-${index}`} id={id} />
            ))}
        </div>
    )
}