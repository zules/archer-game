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
            currentHp: unitData.health,
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
    
    // Handler for begin turn button

    function runTurn() {
        // Determine which column is attacking or if game has ended
        
        //First, get every unit's health and put in an array
        const healthTotals = [];
        for (let unit of userArmy) {
            healthTotals.push(unit.currentHp);
        }
        for (let unit of enemyArmy) {
            healthTotals.push(unit.currentHp);
        }

        const activeLine = 0;
        let line1HealthSum = 0;
        let line2HealthSum = 0;
        let line3HealthSum = 0;

        for (let [index, health] of healthTotals.entries()) {

            if (allUnitsLine1.includes(index)) {
                line1HealthSum += health;
            }
            if (allUnitsLine2.includes(index)) {
                line2HealthSum += health;
            }
            if (allUnitsLine3.includes(index)) {
                line3HealthSum += health;
            }

        }

        console.log(`Line 1 Health: ${line1HealthSum}`);
        console.log(`Line 2 Health: ${line2HealthSum}`);
        console.log(`Line 3 Health: ${line3HealthSum}`);





        alert('Button clicked!');
    }
        
        return (
            <>
            <header>
                <GameUI onButtonClick={runTurn} buttonText="Begin Turn" />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}