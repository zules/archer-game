import { useState, useEffect } from 'react';

import { randomArmy, initializeArmy, establishEngagedUnits, createAttackQueue, performAttacks } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'
import GameUI from './GameUI.jsx';

// Set initial armies
const enemyArmyInitial = randomArmy();
const userArmyInitial = randomArmy();

export default function TheGame () {
    
    // Initialize state for both armies
    const [enemyArmy, setEnemyArmy] = useState(() => 
    initializeArmy(enemyArmyInitial, "enemy")
    );
    const [userArmy, setUserArmy] = useState(() => 
    initializeArmy(userArmyInitial, "user")
    );

    // Initialize game score
    const [userScore, setUserScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);

    // Initialize game status
    const [isGameOver, setIsGameOver] = useState(false);
    console.log(`Rendering TheGame. Is game over? ${isGameOver}`)

    // Initialize turn by turn log
    const [turnLog, setTurnLog] = useState([]);

    // End initialization

    // Check if game is over

    const enemyHealthTotal = enemyArmy.reduce((total, unit) => total + unit.currentHp, 0);
    const userHealthTotal = userArmy.reduce((total, unit) => total + unit.currentHp, 0);

    if (!isGameOver) {
        if (enemyHealthTotal <= 0 || userHealthTotal <= 0)
        {
            setIsGameOver(true);
        }
    }

    // Handler for begin turn button

    function runTurn() {
        // Double check that game is not over
        if (isGameOver) return alert("Error: The game is over.");

        // Determine which units are engaged to attack this turn
        const readiedUserArmy = establishEngagedUnits(userArmy, userArmy, enemyArmy);
        const readiedEnemyArmy = establishEngagedUnits(enemyArmy, userArmy, enemyArmy);

        // Sort them
        const sortedAttackers = createAttackQueue(readiedUserArmy, readiedEnemyArmy);

        // Check if game is over
        if (sortedAttackers.length <= 0) {
            setIsGameOver(true);
        }

        // Perform attacks
        const { userArmyAfterAttacks, enemyArmyAfterAttacks, combatLog } = performAttacks(sortedAttackers, readiedUserArmy, readiedEnemyArmy);


        // Update state
        // setUserArmy(userArmyAfterAttacks);
        // setEnemyArmy(enemyArmyAfterAttacks);

        
        setTurnLog(combatLog);

    }
    
        // Placeholders for messages in lanes
        const [topLaneMsg, setTopLaneMsg] = useState("");
        const [midLaneMsg, setMidLaneMsg] = useState("");
        const [botLaneMsg, setBotLaneMsg] = useState("");

        const [topLaneArrows, setTopLaneArrows] = useState("");
        const [midLaneArrows, setMidLaneArrows] = useState("");
        const [botLaneArrows, setBotLaneArrows] = useState("");

        // Animating results
        useEffect(() => {

                const initialUserEngagement = turnLog[0]?.userArmySnapshot;
                const initialEnemyEngagement = turnLog[0]?.enemyArmySnapshot;

                setUserArmy(prev => prev.map((unit, index) => ({
                    ...unit, 
                    engaged: initialUserEngagement?.[index].engaged ?? false 
                    })));
                setEnemyArmy(prev => prev.map((unit, index) => ({
                    ...unit, 
                    engaged: initialEnemyEngagement?.[index].engaged ?? false 
                    })));


        const runBattlePlayback = (turnLog) => {
                if (turnLog.length === 0) {

                // If this is the end, clear all active messages and indicators
                setUserArmy(prev => prev.map(unit => ({...unit, engaged: false })));
                setEnemyArmy(prev => prev.map(unit => ({...unit, engaged: false })));

                setTopLaneMsg("");
                setMidLaneMsg("");
                setBotLaneMsg("");
                setTopLaneArrows("");
                setMidLaneArrows("");
                setBotLaneArrows("");
                

                return;
            }



            const [currentEvent, ...remainingEvents] = turnLog;
            const {attacker, defender, attackPower, userArmySnapshot, enemyArmySnapshot} = currentEvent;
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
            console.log("Army snapshot rendering.");
            setUserArmy(userArmySnapshot);
            setEnemyArmy(enemyArmySnapshot);

            console.log("2 second timer engaged.")
            setTimeout(() => {
                runBattlePlayback(remainingEvents);
            }, 2000);

        }
        runBattlePlayback(turnLog);



        }, [turnLog]);

        
        
        return (
            <>
            <header>
                <GameUI onButtonClick={runTurn} buttonText="Begin Turn" isGameOver={isGameOver} userScore={userScore} enemyScore={enemyScore} />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane topLaneMsg={topLaneMsg}
                midLaneMsg={midLaneMsg}
                botLaneMsg={botLaneMsg}
                topLaneArrows={topLaneArrows}
                midLaneArrows={midLaneArrows}
                botLaneArrows={botLaneArrows} />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}