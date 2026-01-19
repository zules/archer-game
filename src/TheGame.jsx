import { useState } from 'react';

import { UNIQUES } from './uniques';
import { randomArmy } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'
import GameUI from './GameUI.jsx';

function handleButtonClick() {
    alert('Button clicked!');
}


export default function TheGame () {

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
        const [enemyArmy, setEnemyArmy] = useState(() => 
            initializeArmy(enemyArmyInitial, "enemy")
        );
        const [userArmy, setUserArmy] = useState(() => 
            initializeArmy(userArmyInitial, "user")
        );
        
        // End initialization and determine which unit attacks first
        
        return (
            <>
            <header>
                <GameUI onButtonClick={handleButtonClick} />
            </header>
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane />
                <Battlefield className="user army" units={userArmy} />
            </main>
            </>
        );
    
}