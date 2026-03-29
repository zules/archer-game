import { Link } from 'react-router-dom'
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';
import ViewInventory from "./ViewInventory.jsx";
import useInventory from "./useInventory.jsx"
import { useState, useMemo, useEffect } from "react";
import { CLANS_STRONGEST_FIRST, UNIQUES_ARRAY } from './uniques';
import ClanTabs from './ClanTabs'

export default function Recruit() {

    const { addOneCard } = useInventory();
    const [activeClan, setActiveClan] = useState(CLANS_STRONGEST_FIRST[0]);

    const { inventory } = useInventory();

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

    },[])

    const visibleCards = useMemo(() => {
      return allCards.filter((card) => card.clan === activeClan);
    }, [allCards, activeClan])

    return (
        <>
        <Link to="/"><h3 className="text-red-500">Go Home</h3></Link>
        <ClanTabs activeClan={activeClan} setActiveClan={setActiveClan}/>
        <div className="flex">
            <div>
                              <div className="grid grid-cols-3 gap-1">
                                {visibleCards.map((unit) => (

                                      <DisplayUnit key={unit.instanceId} unitData={unit} />
                                ))}
                              </div>
            </div>
        </div>
        </>

    )
}