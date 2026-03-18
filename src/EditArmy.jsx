import { useLocalStorage } from "@uidotdev/usehooks"
import { Link } from 'react-router-dom'
import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';
import useDeck from "./useDeck.jsx"
import { useState, useEffect } from "react";
import {
  initializeDeckBuild,
} from "./battleCalcs";


export default function EditArmy() {

      const { deck } = useDeck();
    const [army, setArmy] = useState(() =>
      initializeDeckBuild(deck)
    );

const [selectedCard, setSelectedCard] = useState(null);

    return (
        <>
        <Link to="/"><h3 className="text-red-500">Quit editing and Go Home</h3></Link>
        <div className="flex gap-10 items-start justify-center">
            <div>
                <h2 className="font-bold text-lg text-center">Your Owned Units</h2>
            </div>
            <div>
                <h2 className="font-bold text-lg text-center">Your Current Army</h2>


              <ArmyGrid direction="ltr" bgColor="">
                {army.map((unit) => (
                  <button
                    key={unit.instanceId}
                    onClick={() => setSelectedCard(unit.instanceId)}
                  >
                    {unit.instanceId.includes("empty") ? (
                      <EmptyUnit engaged={ selectedCard === unit.instanceId ? true : false } />
                    ) : (
                      <DisplayUnit unitData={ selectedCard === unit.instanceId ? { ...unit, engaged: true, engagedColor: "ring-blue-600" } : unit } />
                    )}
                  </button>
                ))}
              </ArmyGrid>

            </div>
        </div>
        </>
    )
}