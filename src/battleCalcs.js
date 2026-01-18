import { UNIQUES_ARRAY } from './uniques';

// An array of all unique unit numbers
const unitNumbers = UNIQUES_ARRAY.map(([num, obj]) => num);

export const randomArmy = () => {
    const randomEntries = [];
    for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * unitNumbers.length);
    randomEntries.push(unitNumbers[randomIndex]);
    }
    console.log("Generated Random Army:", randomEntries);
    return randomEntries;
};