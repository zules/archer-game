// useInventory.js
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useInventory() {
  const [inventory, setInventory] = useLocalStorage("inventory", {});

// The pure logic — no state, just takes an inventory and returns a new one
function applyCard(inventory, cardId, variant = "default", number = 1) {
  return {
    ...inventory,
    [cardId]: {
      ...inventory[cardId],
      [variant]: (inventory[cardId]?.[variant] ?? 0) + number
    }
  };
}

const addOneCard = (cardId, variant = "default", number = 1) => {
  setInventory(prev => applyCard(prev ?? {}, cardId, variant, number));
};

const addMultipleCards = (cards) => {
  setInventory(prev => {
    let updated = prev ?? {};
    cards.forEach(({ cardId, variant = "default", number = 1 }) => {
      updated = applyCard(updated, cardId, variant, number);
    });
    return updated;
  });
};

  const getCount = (cardId, variant = "default") => {
    return inventory[cardId]?.[variant] ?? 0;
  };

  return { inventory, addOneCard, addMultipleCards, getCount };
}