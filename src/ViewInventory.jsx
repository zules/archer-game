import React, { useState, useMemo } from 'react';
import { CLANS_STRONGEST_FIRST, UNIQUES } from './uniques';
import useInventory from './useInventory'
import DisplayUnit from './DisplayUnit'

export default function ViewInventory({ currentArmy = [], showAvailable = true, onCardClick }) {

const [activeClan, setActiveClan] = useState(CLANS_STRONGEST_FIRST[0]);

    const { inventory } = useInventory();



const displayedCards = useMemo(() => {
  // 1. Flatten and Filter
  const allVariants = Object.entries(inventory).flatMap(([id, variants]) => {
    const cardBaseData = UNIQUES.get(id);
    if (!cardBaseData || cardBaseData.clan !== activeClan) return [];

    return Object.entries(variants).map(([variantType, count]) => {

      const inDeck = currentArmy.filter(unit =>
        unit.cardId === id &&
        (unit.variant || "default") === variantType
      ).length;

      const available = count - inDeck;


      // 2. "Hydrate" the data for DisplayUnit
      return {
        instanceId: `${id}-${variantType}`,
        id,
        count,
        inDeck,      // Currently in Army
        available,   // What's left to use
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
        <button
          key={card.instanceId}
          onClick={() => onCardClick(card)}
          disabled={card.available <= 0}
          className={`text-left transition-transform active:scale-95 ${
            card.available <= 0 ? "cursor-not-allowed" : "hover:scale-105"
          }`}
        >
      <DisplayUnit unitData={card} /></button>
        <div className="flex flex-col text-center">
          <h3>{card.variantType}</h3>
          <p className="font-bold">{card.count} owned</p>
            {showAvailable && (
                <div className="flex justify-center gap-1 text-sm font-mono mt-1">
                <span className="text-indigo-600 font-bold">{card.inDeck} in deck</span>
                <span className="text-slate-300">/</span>
                <span className={`font-bold ${card.available <= 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {card.available} available
                </span>
                </div>
            )}
        </div>





    </div>
  ))}
</div>
        </>
    )
}