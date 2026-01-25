import Scoreboard from "./Scoreboard.jsx";

export default function GameUI({ onButtonClick, buttonText, isGameOver, userScore, enemyScore }) {

    if (isGameOver) {
        return (
        <>
            <Scoreboard userScore={userScore} enemyScore={enemyScore} />
            <h2>Game over!</h2>
        </>
        );
    }

    return (
        <>
            <Scoreboard userScore={userScore} enemyScore={enemyScore} />
            <button disabled={isGameOver} className="start-turn" onClick={onButtonClick}>{buttonText}</button>
        </>
    );
}