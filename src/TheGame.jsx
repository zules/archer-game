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

        function setArmyEngagement(x,y,z, army) {
            army((prev) => {
                return prev.map((unit, index) => {
                    if (unit.currentHp <= 0) {
                        return {...unit, engaged: false};
                    }
                    else {
                        if (index == x && unit.currentHp > 0) {
                            return {...unit, engaged: true};
                        }
                        else if (index == y && prev[x].currentHp <= 0 && unit.currentHp > 0) {
                            return {...unit, engaged: true};
                        }
                        else if (index == z && prev[x].currentHp <= 0 && prev[y].currentHp <= 0 && unit.currentHp > 0) {
                            return {...unit, engaged: true};
                        }
                        else {
                            return unit;
                        }
                    }
                })
            })
        }
        
        setArmyEngagement(...row1, setUserArmy);
        setArmyEngagement(...row2, setUserArmy);
        setArmyEngagement(...row3, setUserArmy);
        setArmyEngagement(...row1, setEnemyArmy);
        setArmyEngagement(...row2, setEnemyArmy);
        setArmyEngagement(...row3, setEnemyArmy);

        alert(`Button clicked`);

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