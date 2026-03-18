// useDeck.js
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useDeck() {
  const [deck, setDeck] = useLocalStorage("deck", Array(9).fill(null));

  const setSlot = (slotIndex, cardId, variant = "default") => {
    setDeck(prev => {
      const updated = [...prev];
      updated[slotIndex] = { cardId, variant };
      return updated;
    });
  };

  const clearSlot = (slotIndex) => {
    setDeck(prev => {
      const updated = [...prev];
      updated[slotIndex] = null;
      return updated;
    });
  };

  const swapSlots = (indexA, indexB) => {
    setDeck(prev => {
      const updated = [...prev];
      [updated[indexA], updated[indexB]] = [updated[indexB], updated[indexA]];
      return updated;
    });
  };

  const setFullDeck = (cards) => {
  setDeck(cards.map(card =>
    typeof card === "string" ? { cardId: card, variant: "default" } : card
  ));
};

  const isDeckFull = () => deck.every(slot => slot !== null);
  const isDeckEmpty = () => deck.every(slot => slot === null);

  return { deck, setDeck, setSlot, clearSlot, swapSlots, setFullDeck, isDeckFull, isDeckEmpty };
}