export default function DisplayUnit({unitData}) {

        const { name, atk, currentHp, hp, spd, clan, acc, dz } = unitData;

        return (
        <div className="unit">
            <p>{name}</p>
            <div>
                <div className="stats">
                <p>HP: {currentHp} / {hp}</p>
                </div>
                <div className="stats">
                    <p>ATK: {atk}</p>
                    <p>SPD: {spd}</p>
                    <p>ACC: {acc}%</p>
                </div>
                <div className="stats">
                    <p>DZ: {dz}</p>
                    <p>{clan}{clan != "Scarestare" ? "er" : "r"}</p>
                </div>
            </div>
        </div>
    );
}