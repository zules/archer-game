import { useState } from 'react';

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

    console.log(`Performing game over check.`)
    if (!isGameOver) {
        console.log(`Game is not over yet because there are still readied units. Let's check health totals.`)
        if (enemyHealthTotal <= 0 || userHealthTotal <= 0)
        {
            console.log(`Health totals on at least one side are zero. So game should be over.`)
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

        console.log(combatLog);

        // Update state
        setUserArmy(userArmyAfterAttacks);
        setEnemyArmy(enemyArmyAfterAttacks);

        
        setTurnLog(combatLog);

    }
        
        return (
            <>
            <header>
                <GameUI onButtonClick={runTurn} buttonText="Begin Turn" isGameOver={isGameOver} userScore={userScore} enemyScore={enemyScore} />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane log={turnLog} />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}