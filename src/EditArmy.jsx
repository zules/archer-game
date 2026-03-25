import { useLocalStorage } from "@uidotdev/usehooks"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';
import ViewInventory from "./ViewInventory.jsx";
import useDeck from "./useDeck.jsx"
import { useState, useEffect } from "react";
import {
  initializeDeckBuild,
} from "./battleCalcs";


export default function EditArmy() {

  const navigate = useNavigate();

      const { deck, setDeck } = useDeck();
    const [army, setArmy] = useState(() =>
      initializeDeckBuild(deck)
    );

    const [selectedCard, setSelectedCard] = useState(null);
    const isRealCardSelected = selectedCard && !selectedCard.includes("empty");

function cardSelect(cardKey) {
  // 0. No swapping from empty slot
  if (selectedCard === null && cardKey.includes("empty")) return;

  // 1. If nothing is selected, select the new card
  if (selectedCard === null) {
    return setSelectedCard(cardKey);
  }

  // 2. If the user clicks the SAME card, deselect it
  if (selectedCard === cardKey) {
    return setSelectedCard(null);
  }

  // 3. Swap Logic
  setArmy((prevArmy) => {
    // Find the positions of both cards
    const indexA = prevArmy.findIndex(u => u.instanceId === selectedCard);
    const indexB = prevArmy.findIndex(u => u.instanceId === cardKey);

    // Create a shallow copy to stay immutable
    const newArmy = [...prevArmy];

    // The "Elegant" ES6 Swap
    [newArmy[indexA], newArmy[indexB]] = [newArmy[indexB], newArmy[indexA]];

    return newArmy;
  });

  // 4. Clear selection after the swap
  setSelectedCard(null);
}


const addCardToArmy = (card) => {
  // 1. Check if there's an empty slot
  const firstEmptyIndex = army.findIndex(u => u.instanceId.includes("empty"));

  // 2. If no room or no cards available, do nothing
  if (firstEmptyIndex === -1 || card.available <= 0) return;

  // 3. Update the army state
  setArmy(prevArmy => {
    const newArmy = [...prevArmy];

    newArmy[firstEmptyIndex] = {
      ...card,
      // We give it a truly unique ID so you can have multiples of the same card in a deck
      instanceId: `${card.id}-${card.variantType}-${crypto.randomUUID()}`,
      cardId: card.id, // ensuring naming consistency for saveDeck
      variant: card.variantType
    };

    return newArmy;
  });
};

const removeCardFromArmy = () => {
  // Guard: Don't do anything if no card is selected OR if an empty slot is selected
  if (!selectedCard || selectedCard.includes("empty")) return;

  setArmy((prevArmy) => {
    return prevArmy.map((unit) => {
      if (unit.instanceId === selectedCard) {
        // Replace with a fresh empty unit object
        // We use a unique ID to keep React's reconciliation happy
        return {
          instanceId: `empty-${crypto.randomUUID()}`,
        };
      }
      return unit;
    });
  });

  // Clear selection after removing
  setSelectedCard(null);
};

const saveDeck = () => {
  const formattedDeck = army.map((unit) => {
    // 1. If it's an empty slot, save it as null
    if (unit.instanceId.includes("empty")) {
      return null;
    }

    // 2. If it's a card, only save the ID and the variant
    return {
      cardId: unit.cardId,
      variant: unit.variant || "default",
    };
  });

  // 3. Save this clean array to your hook/localStorage
  setDeck(formattedDeck);

  // 4. Head home
  navigate('/');
};

    return (
        <>
        <Link to="/"><h3 className="text-red-500">Quit editing and Go Home</h3></Link>
        <div className="w-full flex justify-center"><button className="border border-gray-300 p-2 rounded-lg text-center w-fit" onClick={() => saveDeck()}>Save and Quit</button></div>
        <div className="flex gap-10 items-start justify-center">
            <div>
                <h2 className="font-bold text-lg text-center">Your Owned Units</h2>
                <ViewInventory currentArmy={army} onCardClick={addCardToArmy} />
            </div>
            <div>
                <h2 className="font-bold text-lg text-center">Your Current Army</h2>

                {/* THE REMOVE BUTTON */}
        <button
          onClick={removeCardFromArmy}
          disabled={!isRealCardSelected}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            isRealCardSelected
              ? "bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-95" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          }`}
        >
          Remove Selected Card
        </button>


              <ArmyGrid direction="ltr" bgColor="">
                {army.map((unit) => (
                  <button
                    key={unit.instanceId}
                    onClick={() => cardSelect(unit.instanceId)}
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