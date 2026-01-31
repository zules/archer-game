import { useState, useEffect } from 'react';

export default function Lane({log}) {

console.log("Lane's turn log is");
console.table(log);

const [topLaneMsg, setTopLaneMsg] = useState("");
const [midLaneMsg, setMidLaneMsg] = useState("");
const [botLaneMsg, setBotLaneMsg] = useState("");

useEffect(() => {
    if (log.length === 0) {
        setTopLaneMsg("");
        setMidLaneMsg("");
        setBotLaneMsg("");
        return;
    }

const runBattlePlayback = (log) => {

    const [currentEvent, ...remainingEvents] = log;
    const {attacker, defender, attackPower} = currentEvent;
    const [side, positionStr] = attacker.split("-");
    const position = parseInt(positionStr);

    const message = `${attacker} shot ${defender} for ${attackPower} dmg.`

    switch (position) {
        case 1:
        case 4:
        case 7:
            setTopLaneMsg(message);
            setMidLaneMsg("");
            setBotLaneMsg("");
            break;
        case 2:
        case 5:
        case 8:
            setTopLaneMsg("");
            setMidLaneMsg(message);
            setBotLaneMsg("");
            break;
        case 3:
        case 6:
        case 9:
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
                    <p>{topLaneMsg}</p>
                </div>
                <div key={2} className="lane">
                    <p>{midLaneMsg}</p>
                </div>
                <div key={3} className="lane">
                    <p>{botLaneMsg}</p>
                </div>
        </div>
    );
}