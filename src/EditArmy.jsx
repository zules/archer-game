import { useLocalStorage } from "@uidotdev/usehooks"
import { Link } from 'react-router-dom'
import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import useDeck from "./useDeck.jsx"
import { useState, useEffect } from "react";
import {
  initializeArmy,
} from "./battleCalcs";


export default function EditArmy() {

      const { deck } = useDeck();
    const [army, setArmy] = useState(() =>
      initializeArmy(deck, "user")
    );

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
                        <DisplayUnit key={unit.instanceId} unitData={unit} />
                      ))}
                    </ArmyGrid>

            </div>
        </div>
        </>
    )
}