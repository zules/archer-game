import { useState } from 'react';

import { UNIQUES } from './uniques';
import { randomArmy } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'


export default function TheGame () {

        //set initial armies
        const enemyArmyInitial = randomArmy();
        const userArmyInitial = randomArmy();

        //initialize armies with unit data
        const initializeArmy = (armyVar, armyType) => {
            return armyVar.map((id, index) => {
                const unitData = UNIQUES.get(id);
                return {
                    ///SPREAD operator
                    ...unitData,
                    instanceId: `${armyType}-${index}-${id}`,
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

        return (
            <main className="playing-field">
                <Battlefield className="enemy army" units={enemyArmy} />
                <Lane />
                <Battlefield className="user army" units={userArmy} />
            </main>
        );
    
}