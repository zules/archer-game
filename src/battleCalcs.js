import { UNIQUES, UNIQUES_ARRAY, CLANS_STRONGEST_FIRST } from './uniques';

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
            baseAcc: unitData.acc,
            baseAtk: unitData.atk,
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

    // Create a combat log
    let combatLog = [];

    let userArmyDuringAttacks = [...userArmyForAttacks];
    let enemyArmyDuringAttacks = [...enemyArmyForAttacks];

    ({ userArmyDuringAttacks, enemyArmyDuringAttacks, combatLog } = performOnEngageAbils(sortedAttackers, userArmyDuringAttacks, enemyArmyDuringAttacks, combatLog));

            sortedAttackers.forEach(unit => {
                    const [side, positionStr] = unit.split("-");
                    const position = Number(positionStr);
                    const oppositeSide = side === "user" ? "enemy" : "user";
                    const defendingArmyStats = side === "user" ? enemyArmyDuringAttacks : userArmyDuringAttacks;
                    const attackingArmyStats = side === "user" ? userArmyDuringAttacks : enemyArmyDuringAttacks;

                const { target, validTargets } = getTargets(position, oppositeSide, sortedAttackers);

                const isTargetAlive = isUnitAlive(defendingArmyStats, target);
                const isAttackerStillAlive = isUnitAlive(attackingArmyStats, unit);

                let attackPower = attackingArmyStats.find(power => power.instanceId === unit).atk;
                let isSupereffective;

                if (doesAttackHit(attackingArmyStats, unit) === false) {
                    attackPower = 0;
                }

                else {
                    // Do a check for supereffectiveness
                    const attackingClan = attackingArmyStats.find(u => u.instanceId === unit).clan;
                    const defendingClan = defendingArmyStats.find(u => u.instanceId === target).clan;
                    isSupereffective = supereffectiveCheck(attackingClan, defendingClan);
                    if (isSupereffective) {
                        attackPower = attackPower * 2;
                    }
                }

                if (isAttackerStillAlive) {
                    if (side === "user") {
                        userArmyDuringAttacks = makeHeal(userArmyDuringAttacks, unit)
                    }
                    else if (side === "enemy") {
                        enemyArmyDuringAttacks = makeHeal(enemyArmyDuringAttacks, unit)
                    }}

                if (isTargetAlive && isAttackerStillAlive) {

                    if (side === "user") {
                    enemyArmyDuringAttacks = makeAttack(enemyArmyDuringAttacks, userArmyDuringAttacks, unit, target, validTargets, attackPower);
                    }
                    else if (side === "enemy") {
                    userArmyDuringAttacks = makeAttack(userArmyDuringAttacks, enemyArmyDuringAttacks, unit, target, validTargets, attackPower);
                    }
                    else {
                        throw new Error(`Cannot determine attacking army.`);
                    }

                combatLog.push({
                    attacker: unit,
                    defender: target,
                    attackPower: attackPower,
                    isSupereffective: isSupereffective,
                    userArmySnapshot: userArmyDuringAttacks,
                    enemyArmySnapshot: enemyArmyDuringAttacks,
                    abilityTriggered: null,
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

function makeHeal (attackingArmy, attackingUnit) {

        // Check for abils
        const attackingUnitStats = attackingArmy.find(u => u.instanceId === attackingUnit)
        const ability = attackingUnitStats?.abil?.forAttack?.[0]?.effect;
        const abilityAmount = attackingUnitStats?.abil?.forAttack?.[0]?.amount;
        const maxHealth = attackingUnitStats?.hp;

        // Do a heal if healing is the ability
        if (ability != "heal") return attackingArmy;
        return attackingArmy.map( u => {
            if (u.instanceId === attackingUnit) {
                let newHp = u.currentHp + abilityAmount;
                newHp = Math.min(maxHealth, newHp);
                return {...u, currentHp: newHp}
            }
            return u;
        })
            
}

function makeAttack (defendingArmy, attackingArmy, attackingUnit, attackedId, validTargets, attackPower) {

        // Check for abils
        const attackingUnitStats = attackingArmy.find(u => u.instanceId === attackingUnit)
        const ability = attackingUnitStats?.abil?.forAttack?.[0]?.effect;
        const abilityAmount = attackingUnitStats?.abil?.forAttack?.[0]?.amount;
        
        // Handle attack if piercing is active
        if (ability === "piercing") {
        validTargets.length = abilityAmount;
            return defendingArmy.map( u => {
                if (!validTargets.includes(u.instanceId)) return u;
                let newHp = u.currentHp - attackPower;
                newHp = Math.max(0, newHp);
                return {...u, currentHp: newHp}
            })
        }

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

export function supereffectiveCheck (attackingClan, defendingClan) {

    // Clans STRONGEST TO WEAKEST
const clans = CLANS_STRONGEST_FIRST;
const indexedClans = Object.fromEntries(clans.map((v, i) => [v, i]));
const n = clans.length;
const ia = indexedClans[attackingClan];
const ib = indexedClans[defendingClan];

if (ia == null || ib == null) throw new Error("Clan type cannot be determined in supereffectiveCheck.");

return (ia + 1) % n === ib ? true : false;

}

function performOnEngageAbils (sortedAttackers, userArmy, enemyArmy, combatLog) {
        sortedAttackers.forEach(unit => {
                    const [side, positionStr] = unit.split("-");
                    const position = Number(positionStr);
                    const oppositeSide = side === "user" ? "enemy" : "user";
                    const attackingArmyStats = side === "user" ? userArmy : enemyArmy;

                    const foundUnit = attackingArmyStats.find(u => u.instanceId === unit);
                    const engageAbil = foundUnit?.abil?.onEveryEngage?.[0];
                    if (!engageAbil) return;

                    const ability = engageAbil.effect;
                    const abilityAmount = engageAbil.amount;
                    let abilityNotTriggered = false;

                    const { target, validTargets } = getTargets(position, oppositeSide, sortedAttackers);

                    console.log(`${unit} has ${ability} on engage. The abilityAmount is valued at ${abilityAmount}`)

                        // Blinding
                        if (ability === "blinding") {
                        // Account for percentage format
                        const normalizedPower = abilityAmount * 100;
                    console.log(`Normalized power set to ${normalizedPower}`)
                    
                        if (side === "user") {
                                    enemyArmy = enemyArmy.map( u => {
                                        if (u.instanceId != target) return u;
                                        let newAcc = u.acc - normalizedPower;
                                        newAcc = Math.max(1, newAcc);
                                        return {...u, acc: newAcc};
                                        
                                    })}
                        else if (side === "enemy" ) {
                                    userArmy = userArmy.map( u => {
                                        if (u.instanceId != target) return u;
                                        let newAcc = u.acc - normalizedPower;
                                        newAcc = Math.max(1, newAcc);
                                        return {...u, acc: newAcc};
                                        
                                    })
                        }
                                }

                        // Scary
                        if (ability === "scary") {
                            abilityNotTriggered = true;
                            // Pop targets to scary range
                            validTargets.length = abilityAmount;
                                if (side === "user") {
                                    enemyArmy = enemyArmy.map( u => {
                                        if (!validTargets.includes(u.instanceId)) return u;
                                            if (u.abil.length === 0) return u;
                                            abilityNotTriggered = false;
                                        return {...u, abil: {
                                        onEveryEngage: [],
                                        forAttack: [],
                                        onGetKill: [],
                                        }};
                                        
                                    })}
                                else if (side === "enemy" ) {
                                    userArmy = userArmy.map( u => {
                                        if (!validTargets.includes(u.instanceId)) return u;
                                            if (u.abil.length === 0) return u;
                                            abilityNotTriggered = false;
                                        return {...u, abil: {
                                        onEveryEngage: [],
                                        forAttack: [],
                                        onGetKill: [],
                                        }};
                                        
                                    })}
                        }


                        // Beloved
                        if (ability === "beloved") {
                            abilityNotTriggered = true;
                            const clanOfUnit = foundUnit.clan;
                                if (side === "user") {
                                    enemyArmy = enemyArmy.map( u => {
                                        if (u.instanceId !== target) return u;
                                            if (u.clan !== clanOfUnit) return u;
                                            if (u.atk === abilityAmount) return u;
                                            abilityNotTriggered = false;
                                        return {...u, atk: abilityAmount};
                                        
                                    })}
                                else if (side === "enemy" ) {
                                    userArmy = userArmy.map( u => {
                                        if (u.instanceId !== target) return u;
                                            if (u.clan !== clanOfUnit) return u;
                                            if (u.atk === abilityAmount) return u;
                                            abilityNotTriggered = false;
                                        return {...u, atk: abilityAmount};
                                        
                                    })}
                        }
                    
                    if (abilityNotTriggered === true) {
                        return;
                    }

                    else {

                    combatLog.push({
                    attacker: unit,
                    defender: target,
                    attackPower: null,
                    isSupereffective: null,
                    userArmySnapshot: userArmy,
                    enemyArmySnapshot: enemyArmy,
                    abilityTriggered: ability,
                })
            }
        })

          return {
            userArmyDuringAttacks: userArmy,
            enemyArmyDuringAttacks: enemyArmy,
            combatLog: combatLog,
        };
    }

function getTargets (position, oppositeSide, sortedAttackers) {
                // Determine which unit is being attacked

                let target;
                let validTargets;

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

                target = validTargets.find(p => sortedAttackers.includes(p));

                return {
                    target,
                    validTargets,
                }
}