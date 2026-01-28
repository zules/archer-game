import { useState } from 'react';

import { UNIQUES } from './uniques';
import { randomArmy } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'
import GameUI from './GameUI.jsx';

// Row index references
const row1 = [0,3,6];
const row2 = [1,4,7];
const row3 = [2,5,8];

// Set initial armies
const enemyArmyInitial = randomArmy();
const userArmyInitial = randomArmy();

// Initialize armies with unit data
const initializeArmy = (armyVar, armyType) => {
    return armyVar.map((id, index) => {
        const unitData = UNIQUES.get(id);
        return {
            ///SPREAD operator
            ...unitData,
            instanceId: `${armyType}-${index+1}`,
            currentHp: unitData.hp,
            engaged: false,
        }
    })
}

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

    // Initialize a state hook for the turn's attack queue
    const [attackQueue, setAttackQueue] = useState([]);

    // End initialization

    // Check if game is over

    const enemyHealthTotal = enemyArmy.reduce((total, unit) => total + unit.currentHp, 0);
    const userHealthTotal = userArmy.reduce((total, unit) => total + unit.currentHp, 0);
    const isGameOver = enemyHealthTotal <= 0 || userHealthTotal <= 0;
    
    // Handler for begin turn button

    function runTurn() {
        // Double check that game is not over
        if (isGameOver) return alert("Error: The game is over.");

        // Determine which units are engaged to attack this turn

        function establishEngagedUnits(army) {
            let armyToReturn = [...army];
            
            function goThroughRow(x,y,z,targetedArmy) {
                return targetedArmy.map((unit, index) => {
                        if (unit.currentHp <= 0) {
                            return {...unit, engaged: false};
                        }
                        else {
                            if (index == x && unit.currentHp > 0) {
                                return {...unit, engaged: true};
                            }
                            else if (index == y && targetedArmy[x].currentHp <= 0 && unit.currentHp > 0) {
                                return {...unit, engaged: true};
                            }
                            else if (index == z && targetedArmy[x].currentHp <= 0 && targetedArmy[y].currentHp <= 0 && unit.currentHp > 0) {
                                return {...unit, engaged: true};
                            }
                            else {
                                return unit;
                            }
                        }
                    })
                }
            
            armyToReturn = goThroughRow(...row1, armyToReturn);
            armyToReturn = goThroughRow(...row2, armyToReturn);
            armyToReturn = goThroughRow(...row3, armyToReturn);

            return armyToReturn;
            }

        const readiedUserArmy = establishEngagedUnits(userArmy);
        const readiedEnemyArmy = establishEngagedUnits(enemyArmy);


        // Sort attackers into a queue that accounts for speed

        const bothArmies = [...readiedUserArmy, ...readiedEnemyArmy];
        
        const sortedAttackers = bothArmies
            .filter(unit => unit.engaged)
            .map(unit => ({...unit, tempRoll: Math.random() }))
            .sort((a, b) => {
                if (b.spd !== a.spd) {
                    return b.spd - a.spd;
                }
                return b.tempRoll - a.tempRoll;
                })
            .map(unit => unit.instanceId);

        setAttackQueue(sortedAttackers);

        console.log(sortedAttackers);

        // REMINDER TO PUT FINAL ARMY STATUS INTO STATE HERE.

        setUserArmy(readiedUserArmy);
        setEnemyArmy(readiedEnemyArmy);

    }
        
        return (
            <>
            <header>
                <GameUI onButtonClick={runTurn} buttonText="Begin Turn" isGameOver={isGameOver} userScore={userScore} enemyScore={enemyScore} />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}