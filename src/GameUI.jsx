export default function GameUI({ onButtonClick, buttonText, isGameOver }) {
    if (isGameOver) {
        return <h2 className="game-over">Game Over!</h2>;
    }

    return (
        <button disabled={isGameOver} className="start-turn" onClick={onButtonClick}>{buttonText}</button>
    );
}