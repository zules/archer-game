export default function DisplayUnit(props) {

        return (
        <div className="unit">
            <p>{props.unitData.name}</p>
            <div className="stats">
                <p>ATK: {props.unitData.atk}</p>
                <p>HP: {props.unitData.currentHp} / {props.unitData.health}</p>
                <p>SPD: {props.unitData.speed}</p>
            </div>
            <div className="flavor-text">
                <p>{props.unitData.flavor}</p>
            </div>
        </div>
    );
}