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

    // Initialize game status
    const [isGameOver, setIsGameOver] = useState(false);
    console.log(`Rendering TheGame. Is game over? ${isGameOver}`)


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

        function establishEngagedUnits(army) {
            let armyToReturn = [...army];
            let oppositeArmy = army === userArmy ? [...enemyArmy] : [...userArmy];
            
            function goThroughRow(x,y,z,targetedArmy) {
                const sumOfEnemyHp = [x,y,z].reduce((accumulator, currentIndex) => accumulator + oppositeArmy[currentIndex].currentHp, 0);

                console.log(`Sum of opposite row HP for index ${x}${y}${z} is ${sumOfEnemyHp}.`)

                return targetedArmy.map((unit, index) => {
                        if (unit.currentHp <= 0) {
                            console.log(`Unit at index ${index} has less than zero health. Setting engaged to false.`)
                            return {...unit, engaged: false};
                        }

                        if (sumOfEnemyHp <= 0 && (index === x || index === y || index === z)) {
                            console.log(`Unit at index ${index} has defeated all enemies. Setting engaged to false.`)
                            return {...unit, engaged: false};
                        }

                        else {
                            if (index == x && unit.currentHp > 0) {
                                console.log(`Unit at index ${index} is a front line unit ready to attack.`)
                                return {...unit, engaged: true};
                            }
                            else if (index == y && targetedArmy[x].currentHp <= 0 && unit.currentHp > 0) {
                                console.log(`Unit at index ${index} is a middle line unit ready to attack.`)
                                return {...unit, engaged: true};
                            }
                            else if (index == z && targetedArmy[x].currentHp <= 0 && targetedArmy[y].currentHp <= 0 && unit.currentHp > 0) {
                                console.log(`Unit at index ${index} is a back line unit ready to attack.`)
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

        console.log("Readying user army as:")
        console.table(readiedUserArmy);
        console.log("Readying enemy army as:")
        console.table(readiedEnemyArmy);

        // Sort attackers into a queue that accounts for speed

        const bothArmies = [...readiedUserArmy, ...readiedEnemyArmy];

        const sortedAttackers = bothArmies
            .filter(unit => unit.engaged)
            .map(unit => ({...unit, tieBreakRoll: Math.random() }))
            .sort((a, b) => {
                if (b.spd !== a.spd) {
                    return b.spd - a.spd;
                }
                return b.tieBreakRoll - a.tieBreakRoll;
                })
            .map(unit => unit.instanceId);

        console.log(`Speed queue is ${sortedAttackers}.`)
        console.log(`Sorted attackers type detected as:`)
        console.log(typeof sortedAttackers)
        console.table(sortedAttackers);
        console.log(`Units in sorted attackers amounts to ${sortedAttackers.length}`)
        if (sortedAttackers.length <= 0) {
            
            console.log(`Detecting no speed queue. Changing GAMEOVER status to true.`)
            setIsGameOver(true);
        }

        // Get ready to perform attacks

        let userArmyAfterAttacks = [...readiedUserArmy];
        let enemyArmyAfterAttacks = [...readiedEnemyArmy];

        function performAttacks() {

            sortedAttackers.forEach(unit => {

                console.log(`Running attack for ${unit} from sortedAttackers`)
                // Determine which unit is being attacked
                let target;
                let validTargets;
                const [side, position] = unit.split("-");

                const oppositeSide = side === "user" ? "enemy" : "user";

                if (position == 1 || position == 4 || position == 7) {
                    validTargets = [`${oppositeSide}-1`, `${oppositeSide}-4`, `${oppositeSide}-7`]
                }
                else if (position == 2 || position == 5 || position == 8) {
                    validTargets = [`${oppositeSide}-2`, `${oppositeSide}-5`, `${oppositeSide}-8`]
                }
                else if (position == 3 || position == 6 || position == 9) {
                    validTargets = [`${oppositeSide}-3`, `${oppositeSide}-6`, `${oppositeSide}-9`]
                }
                else {
                    console.log("Error in performAttacks validTargets calculation");
                }
                
                console.log(`This unit might be attacking ${validTargets}`)

                const defendingArmyStats = side === "user" ? enemyArmyAfterAttacks : userArmyAfterAttacks;
                const attackingArmyStats = side === "user" ? userArmyAfterAttacks : enemyArmyAfterAttacks;

                target = validTargets.find(p => sortedAttackers.includes(p));

                console.log(`Trying to find target... target is ${target}`);

                let isTargetAlive;

                if (target === undefined) {
                    console.log(`Wait, target not found. Setting aliveness to false.`)
                    isTargetAlive = false;
                }
                else {
                    console.log(`Checking if target is still alive.`)
                    isTargetAlive = defendingArmyStats.find(i => i.instanceId === target).currentHp > 0 ? true : false;
                    console.log(`Are they? ${isTargetAlive}`)
                }

                let isAttackerStillAlive = attackingArmyStats.find(i => i.instanceId === unit).currentHp > 0 ? true : false;


                console.log(`In summary: the next target is ${target} and isAlive is ${isTargetAlive}`);

                // if (validTargets.find(p => sortedAttackers.includes(p))) {
                //     if (defendingArmyStats.find(i => i.instanceId === ))
                //     target = validTargets.find(p => sortedAttackers.includes(p));
                // }

                function makeAttack (attackerId, attackedId) {

                    // NOTE TO SELF clean up this section by using const defendingArmyStats and const attackingArmyStats
                    
                    if (side === "user") {
                        const attackPower = userArmyAfterAttacks.find(power => power.instanceId === attackerId).atk;
                        enemyArmyAfterAttacks = enemyArmyAfterAttacks.map( u => {
                            if (u.instanceId === attackedId) {
                                let newHp = u.currentHp - attackPower;
                                newHp = Math.max(0, newHp);
                                return {...u, currentHp: newHp}
                            }
                            return u;
                        })
                    console.log(`${attackedId} is attacked by ${attackerId} with a ${attackPower} HP attack!`)
                    }

                    else if (side === "enemy") {
                        const attackPower = enemyArmyAfterAttacks.find(power => power.instanceId === attackerId).atk;
                        userArmyAfterAttacks = userArmyAfterAttacks.map( u => {
                            if (u.instanceId === attackedId) {
                                let newHp = u.currentHp - attackPower;
                                newHp = Math.max(0, newHp);
                                return {...u, currentHp: newHp}
                            }
                            return u;
                        })
                    console.log(`${attackedId} is attacked by ${attackerId} with a ${attackPower} HP attack!`)
                    }

                }

                if (isTargetAlive && isAttackerStillAlive) {
                makeAttack(unit,target);
                }

            }
            )

        }

        performAttacks();

        console.log("Turn ends.")

        // REMINDER TO PUT FINAL ARMY STATUS INTO STATE HERE WITH MOST RECENT VARS.

        setUserArmy(userArmyAfterAttacks);
        setEnemyArmy(enemyArmyAfterAttacks);

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