import { UNIQUES, UNIQUES_ARRAY } from './uniques';

// An array of all unique unit numbers
const unitNumbers = UNIQUES_ARRAY.map(([num, obj]) => num);

// Row index references
const row1 = [0,3,6];
const row2 = [1,4,7];
const row3 = [2,5,8];

export const randomArmy = () => {
    const randomEntries = [];
    for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * unitNumbers.length);
    randomEntries.push(unitNumbers[randomIndex]);
    }
    return randomEntries;
};

// Initialize armies with unit data
export const initializeArmy = (armyVar, armyType) => {
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

// Determine which units are engaged to attack this round.
export function establishEngagedUnits(army, userArmy, enemyArmy) {
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

export function createAttackQueue (readiedUserArmy, readiedEnemyArmy) {
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

        return sortedAttackers;

        }


// Perform the attacks
export function performAttacks(sortedAttackers, userArmyForAttacks, enemyArmyForAttacks) {

    let userArmyDuringAttacks = [...userArmyForAttacks];
    let enemyArmyDuringAttacks = [...enemyArmyForAttacks];

    let target;
    let validTargets;


    // Create a combat log
    const combatLog = [];

            sortedAttackers.forEach(unit => {
                    const [side, positionStr] = unit.split("-");
                    const position = Number(positionStr);

                    const oppositeSide = side === "user" ? "enemy" : "user";

                // Determine which unit is being attacked

                if (position % 3 === 1) {
                    validTargets = [`${oppositeSide}-1`, `${oppositeSide}-4`, `${oppositeSide}-7`]
                }
                else if (position % 3 === 2) {
                    validTargets = [`${oppositeSide}-2`, `${oppositeSide}-5`, `${oppositeSide}-8`]
                }
                else if (position % 3 === 0) {
                    validTargets = [`${oppositeSide}-3`, `${oppositeSide}-6`, `${oppositeSide}-9`]
                }
                else {
                    throw new Error(`Invalid position in performAttacks: "${position}". Expected a value between 1 and 9.`);
                }

                const defendingArmyStats = side === "user" ? enemyArmyDuringAttacks : userArmyDuringAttacks;
                const attackingArmyStats = side === "user" ? userArmyDuringAttacks : enemyArmyDuringAttacks;

                target = validTargets.find(p => sortedAttackers.includes(p));

                const isTargetAlive = isUnitAlive(defendingArmyStats, target);
                const isAttackerStillAlive = isUnitAlive(attackingArmyStats, unit);

                let attackPower = attackingArmyStats.find(power => power.instanceId === unit).atk;

                if (doesAttackHit(attackingArmyStats, unit) === false) {
                    attackPower = 0;
                }


                if (isTargetAlive && isAttackerStillAlive) {

                    if (side === "user") {
                    enemyArmyDuringAttacks = makeAttack(enemyArmyDuringAttacks, target, attackPower);
                    }
                    else if (side === "enemy") {
                        userArmyDuringAttacks = makeAttack(userArmyDuringAttacks, target, attackPower);
                    }
                    else {
                        throw new Error(`Cannot determine attacking army.`);
                    }

                combatLog.push({
                    attacker: unit,
                    defender: target,
                    attackPower: attackPower,
                    userArmySnapshot: userArmyDuringAttacks,
                    enemyArmySnapshot: enemyArmyDuringAttacks,
                })
                }

            }

            )

            return {
                userArmyAfterAttacks: userArmyDuringAttacks,
                enemyArmyAfterAttacks: enemyArmyDuringAttacks,
                combatLog,
            }
        }

function makeAttack (defendingArmy, attackedId, attackPower) {


        return defendingArmy.map( u => {
            if (u.instanceId === attackedId) {
                let newHp = u.currentHp - attackPower;
                newHp = Math.max(0, newHp);
                return {...u, currentHp: newHp}
            }
            return u;
        })
    
}

function isUnitAlive (army, unit) {
    if (unit === undefined) {
        return false;
    }
    return army.find(i => i.instanceId === unit).currentHp > 0 ? true : false;
}

function doesAttackHit (army, unit) {
    const baseAccuracy = army.find(power => power.instanceId === unit).acc;
    const roll = Math.floor(Math.random() * 100) + 1;

    if (roll > baseAccuracy) {
        return false;
    }
    return true;
}