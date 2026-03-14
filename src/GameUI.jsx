import Scoreboard from "./Scoreboard.jsx";
import { Link } from 'react-router-dom'

export default function GameUI({ onButtonClick, buttonText, isGameOver, userScore, enemyScore, turnLog }) {

    const isBusy = isGameOver || turnLog.length > 0;

    if (isGameOver) {
        return (
        <>
            <Scoreboard userScore={userScore} enemyScore={enemyScore} />
            <h2>Game over!</h2>
            <Link to="/">Return Home</Link>
        </>
        );
    }

    return (
        <>
            <Link to="/">Quit Game and Go Home</Link>
            <Scoreboard userScore={userScore} enemyScore={enemyScore} />
            <button disabled={isBusy} style={{ cursor: isBusy ? 'not-allowed' : 'pointer' }} className="start-turn" onClick={onButtonClick}>{buttonText}</button>
        </>
    );
}