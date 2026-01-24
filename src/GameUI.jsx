export default function GameUI({ onButtonClick, buttonText, isGameOver }) {
    return (
        <button disabled={isGameOver} className="start-turn" onClick={onButtonClick}>{buttonText}</button>
    );
}