export default function DisplayUnit({unitData}) {

        const { name, atk, currentHp, health, speed, flavor } = unitData;

        return (
        <div className="unit">
            <p>{name}</p>
            <div className="stats">
                <p>ATK: {atk}</p>
                <p>HP: {currentHp} / {health}</p>
                <p>SPD: {speed}</p>
            </div>
            <div className="flavor-text">
                <p>{flavor}</p>
            </div>
        </div>
    );
}