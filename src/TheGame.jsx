import { useState } from 'react';

import { UNIQUES } from './uniques';
import { randomArmy } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'
import GameUI from './GameUI.jsx';

// Define chunks of enemies
const allUnitsLine1 = [0,1,2,9,10,11];
const allUnitsLine2 = [3,4,5,12,13,14];
const allUnitsLine3 = [6,7,8,15,16,17];

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

    // End initialization

    // Check if game is over

    const enemyHealthTotal = enemyArmy.reduce((total, unit) => total + unit.currentHp, 0);
    const userHealthTotal = userArmy.reduce((total, unit) => total + unit.currentHp, 0);
    const isGameOver = enemyHealthTotal <= 0 || userHealthTotal <= 0;
    
    // Handler for begin turn button

    function runTurn() {
        // Determine if game has ended


        alert(`Button clicked!`);
    }
        
        return (
            <>
            <header>
                <GameUI onButtonClick={runTurn} buttonText="Begin Turn" isGameOver={isGameOver} />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}