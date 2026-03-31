import { Link } from 'react-router-dom'
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';
import ViewInventory from "./ViewInventory.jsx";
import useInventory from "./useInventory.jsx"
import { useState, useMemo, useEffect } from "react";
import { CLANS_STRONGEST_FIRST, UNIQUES_ARRAY } from './uniques';
import ClanTabs from './ClanTabs'
import Wallet from './Wallet'
import { useLocalStorage } from "@uidotdev/usehooks"

export default function Recruit() {

    const { addOneCard, inventory } = useInventory();
    const [activeClan, setActiveClan] = useState(CLANS_STRONGEST_FIRST[0]);

        // Currency
    const [clanCoins, setClanCoins] = useLocalStorage("clanCoins", {
      scarestare: 0,
      secretkeep: 0,
      formstorm: 0,
      watercross: 0,
      beatleap: 0,
      skymind: 0,
      fossilcall: 0,
    });

    function buyCard(id, variantType, price, clan) {
        addOneCard(id, variantType, 1);
        setClanCoins(prev => ({ ...prev, [clan]: (prev?.[clan] ?? 0) - price }));
    }

    const allCards = useMemo(() => {

        const cardData = UNIQUES_ARRAY.flatMap((card) => {
            const id = card[0];
            const cardBaseData = card[1];

            const variantPrices = cardBaseData.prices;

            return Object.entries(variantPrices).map(([variantType, price]) => {
                const count = inventory[id]?.[variantType] ?? 0;
                        return {
                        instanceId: `${id}-${variantType}`,
                        id,
                        price,
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


      })

      return cardData;

    },[inventory])

    const visibleCards = useMemo(() => {
      return allCards.filter((card) => card.clan === activeClan);
    }, [allCards, activeClan])

    return (
        <>
        <Link to="/"><h3 className="text-red-500">Go Home</h3></Link>
        <div className="flex flex-col items-center">
            <div className="flex gap-15">
                <div><Wallet /></div>
                <div>
        <ClanTabs activeClan={activeClan} setActiveClan={setActiveClan}/>

                              <div className="grid grid-cols-3 gap-10">
                                {visibleCards.map((unit) => (

                                      <div className="flex flex-col"><DisplayUnit key={unit.instanceId} unitData={unit} /><p>Owned: {unit.count}</p><button
                                      className={`border border-rounded ${unit.count < 9 && (clanCoins?.[unit.clan] ?? 0) >= unit.price ? "bg-slate-100" : "bg-slate-300 cursor-not-allowed"}`}
                                      onClick={unit.count < 9 && (clanCoins?.[unit.clan] ?? 0) >= unit.price ? () => buyCard(unit.id, unit.variantType, unit.price, unit.clan) : undefined}
                                      >
                                        Buy for {unit.price} {unit.clan} coins
                                        </button></div>
                                ))}
                              </div></div></div>
            </div>
        
        </>

    )
}