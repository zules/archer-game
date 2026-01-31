import { useState, useEffect } from 'react';

export default function Lane({log}) {

console.log("Lane's turn log is");
console.table(log);

const [topLaneMsg, setTopLaneMsg] = useState("");
const [midLaneMsg, setMidLaneMsg] = useState("");
const [botLaneMsg, setBotLaneMsg] = useState("");

const [topLaneArrows, setTopLaneArrows] = useState("");
const [midLaneArrows, setMidLaneArrows] = useState("");
const [botLaneArrows, setBotLaneArrows] = useState("");


useEffect(() => {
    if (log.length === 0) {
        return;
    }

const runBattlePlayback = (log) => {
        if (log.length === 0) {
        setTopLaneMsg("");
        setMidLaneMsg("");
        setBotLaneMsg("");
        setTopLaneArrows("");
        setMidLaneArrows("");
        setBotLaneArrows("");
        return;
    }

    const [currentEvent, ...remainingEvents] = log;
    const {attacker, defender, attackPower} = currentEvent;
    const [side, positionStr] = attacker.split("-");
    const position = parseInt(positionStr);

    const message = `${attacker} shot ${defender} for ${attackPower} dmg.`

    let arrows;

    switch (side) {
        case 'user':
            arrows = "← ←"
            break;
        case 'enemy':
            arrows = "→ →"
            break;
    }

    switch (position) {
        case 1:
        case 4:
        case 7:
            setTopLaneArrows(arrows);
            setMidLaneArrows("");
            setBotLaneArrows("");
            setTopLaneMsg(message);
            setMidLaneMsg("");
            setBotLaneMsg("");
            break;
        case 2:
        case 5:
        case 8:
            setTopLaneArrows("");
            setMidLaneArrows(arrows);
            setBotLaneArrows("");
            setTopLaneMsg("");
            setMidLaneMsg(message);
            setBotLaneMsg("");
            break;
        case 3:
        case 6:
        case 9:
            setTopLaneArrows("");
            setMidLaneArrows("");
            setBotLaneArrows(arrows);
            setTopLaneMsg("");
            setMidLaneMsg("");
            setBotLaneMsg(message);
            break;
        default:
    }

    setTimeout(() => {
        runBattlePlayback(remainingEvents);
    }, 2200);

}
runBattlePlayback(log);
}, [log]);

    return (
        <div className="lanes">
                <div key={1} className="lane">
                    <p className="arrows">{topLaneArrows}</p>
                    <p>{topLaneMsg}</p>
                </div>
                <div key={2} className="lane">
                    <p className="arrows">{midLaneArrows}</p>
                    <p>{midLaneMsg}</p>
                </div>
                <div key={3} className="lane">
                    <p className="arrows">{botLaneArrows}</p>
                    <p>{botLaneMsg}</p>
                </div>
        </div>
    );
}