import React, { useState, useMemo } from 'react';
import { CLANS_STRONGEST_FIRST, UNIQUES } from './uniques';
import useInventory from './useInventory'
import DisplayUnit from './DisplayUnit'

export default function ViewInventory() {

const [activeClan, setActiveClan] = useState(CLANS_STRONGEST_FIRST[0]);

    const { inventory } = useInventory();

    const processedInventory = useMemo(() => {
  return Object.entries(inventory).flatMap(([id, variants]) => {
    const cardBaseData = UNIQUES.get(id);

    // For this specific card, turn its variants into individual entries
    return Object.entries(variants).map(([variantType, count]) => {
      return {
        instanceId: `${id}-${variantType}`, // A unique key for React
        id,
        variantType, // "default", "shiny", etc.
        count,
        ...cardBaseData,
      };
    });
  });
}, [inventory]);

const displayedCards = useMemo(() => {
  // 1. Flatten and Filter
  const allVariants = Object.entries(inventory).flatMap(([id, variants]) => {
    const cardBaseData = UNIQUES.get(id);
    if (!cardBaseData || cardBaseData.clan !== activeClan) return [];

    return Object.entries(variants).map(([variantType, count]) => {
      // 2. "Hydrate" the data for DisplayUnit
      return {
        instanceId: `${id}-${variantType}`,
        count,
        variantType,
        ...cardBaseData,
        // Map static stats to the names DisplayUnit expects
        currentHp: cardBaseData.hp, // Fresh cards are at full health
        baseAtk: cardBaseData.atk,
        baseAcc: cardBaseData.acc,
        baseGly: cardBaseData.gly,
        // Default flags for UI states
        engaged: false,
      };
    });
  });

  // 3. Sorting (Default first, then Alphabetical)
  return allVariants.sort((a, b) => {
    if (a.variantType === 'default' && b.variantType !== 'default') return -1;
    if (a.variantType !== 'default' && b.variantType === 'default') return 1;
    return a.name.localeCompare(b.name);
  });
}, [inventory, activeClan]);


    return (
        <>

<nav className="flex flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-8">
    {CLANS_STRONGEST_FIRST.map((clanName) => {
      const isSelected = activeClan === clanName;
      return (
        <button
          key={clanName}
          onClick={() => setActiveClan(clanName)}
          className={`
            px-5 py-2 border-2 font-bold text-xs transition-all duration-200 whitespace-nowrap
            ${isSelected
              ? `shadow-md bg-slate-50`
              : `border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700`
            }
          `}
        >
          {clanName}
        </button>
      );
    })}
</nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {displayedCards.length < 1 && "No cards of this clan owned."}
  {displayedCards.map((card) => (
    <div key={card.instanceId} className="relative group">

      <DisplayUnit unitData={card} />
        <div className="flex flex-col text-center">
          <h3>{card.variantType}</h3>
          <p className="font-bold">{card.count} owned</p>
        </div>

    </div>
  ))}
</div>
        </>
    )
}