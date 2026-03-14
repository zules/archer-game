import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom'
import { UNIQUES, UNIQUES_ARRAY, CLANS_STRONGEST_FIRST } from './uniques';
import DisplayUnit from './DisplayUnit';
import useInventory from "./useInventory";
import useDeck from "./useDeck"

const starterCards = {
    Scarestare: { strongCard: "18", weakCard: "19" },
    Secretkeep: { strongCard: "22", weakCard: "25" },
    Formstorm: { strongCard: "10", weakCard: "07" },
    Watercross: { strongCard: "32", weakCard: "33" },
    Beatleap: { strongCard: "03", weakCard: "01" },
    Skymind: { strongCard: "28", weakCard: "29" },
    Fossilcall: { strongCard: "11", weakCard: "15" },
}

export default function Onboarding() {
    const [savedClan, setSavedClan] = useLocalStorage("savedClan", null);
    const { inventory, addMultipleCards } = useInventory();
    const { setFullDeck } = useDeck();

        // Render starter cards
const clanIds = starterCards[savedClan];

// If the clan exists in our map, grab the full objects
const displayedStrongCard = clanIds ? UNIQUES.get(clanIds.strongCard) : null;
const displayedWeakCard = clanIds ? UNIQUES.get(clanIds.weakCard) : null;

// Add cards to inventory and populate starter deck
useEffect(() => {
  if (Object.keys(inventory).length === 0) {
    addMultipleCards([
      { cardId: clanIds.strongCard, number: 1 },
      { cardId: clanIds.weakCard, number: 8 },
    ]);

    setFullDeck([
      clanIds.strongCard,
      ...Array(8).fill(clanIds.weakCard),
    ]);
  }
}, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p>You have chosen the clan of {savedClan}.</p>
            <p>You have received the following archers:</p>
            <div className="grid grid-cols-2 items-center justify-center gap-5">
                <div>
                    <p className="text-6xl text-center">x1</p>
                </div>
                <div>
                    <p className="text-6xl text-center">x8</p>
                </div>
                <div>
                    <DisplayUnit unitData={displayedStrongCard} />
                </div>
                <div>
                    <DisplayUnit unitData={displayedWeakCard} />
                </div>
            </div>
            <Link to="/">Next</Link>
        </div>
    )
}