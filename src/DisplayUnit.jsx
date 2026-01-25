export default function DisplayUnit({unitData}) {

        const { name, atk, currentHp, hp, spd, clan, acc, gly } = unitData;

        return (
        <div className={`unit ${unitData.engaged ? "engaged" : ""} ${currentHp <= 0 ? "dead" : ""}`}>
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
                    <p>GLY: {gly}</p>
                    <p>{clan}{clan != "Scarestare" ? "er" : "r"}</p>
                </div>
            </div>
        </div>
    );
}