import { UNIQUES } from './uniques';

import { useState } from 'react';

import { placeholderTest, placeholderTestTwo } from './battleCalcs';

import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'

placeholderTest();
placeholderTestTwo();

export default function TheGame () {

        //set initial armies
        const enemyArmyInitial = ["04", "01", "03", "01", "01", "01", "01", "01", "01"];
        const userArmyInitial = ["02", "03", "02", "03", "02", "03", "02", "03", "01"];

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