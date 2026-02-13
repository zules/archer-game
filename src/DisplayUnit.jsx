import HealthBar from './HealthBar'

export default function DisplayUnit({unitData}) {

        const { name, atk, currentHp, hp, spd, clan, acc, gly, abil, baseAcc } = unitData;

        const ability = Object.values(abil).flat();

        if (ability.length > 1) {
            throw new Error (`Unit ${name} unexpectedly has more than 1 ability.`)
        }

        const amountDisplay = ability[0]?.amount != null && ability[0].amount < 1
        ? `${ability[0].amount * 100}%`
        : ability[0]?.amount;

        // Calculate whether buffs or debuffs are present
        let accuracyStatus;
        if (baseAcc === acc ) {
            accuracyStatus = null;
        }
        else if (baseAcc < acc) {
            accuracyStatus = "buffed";
        }
        else if (baseAcc > acc) {
            accuracyStatus = "debuffed";
        }

        return (
        <div className={`unit ${unitData.engaged ? "engaged" : ""} ${currentHp <= 0 ? "dead" : ""} ${clan.toLowerCase()}`}>
            <p>{name}</p>
            <div className="stats">
                {ability[0] && <p>{ability[0].effect} ({amountDisplay})</p>}
            </div>
            <div>
                <div className="stats">
                    <HealthBar currentHp={currentHp} hp={hp} />
                </div>
                <div className="stats">
                    <p>ATK: {atk}</p>
                    <p>SPD: {spd}</p>
                    <p className={accuracyStatus}>{accuracyStatus === "buffed" ? "▲" : accuracyStatus === "debuffed" ? "▼" : ""}ACC: {acc}%</p>
                </div>
                <div className="stats">
                    <p>GLY: {gly}</p>
                    <p>{clan}{clan != "Scarestare" ? "er" : "r"}</p>
                </div>
            </div>
        </div>
    );
}