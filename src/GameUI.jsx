import Scoreboard from "./Scoreboard.jsx";
import { Link } from 'react-router-dom'

export default function GameUI({ onButtonClick, buttonText, isGameOver, userScore, enemyScore, turnLog }) {

    const buttonStyle = "px-6 py-2 border border-blue-400 hover:bg-blue-50 rounded-lg focus:ring focus:ring-red-300"
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
            <button disabled={isBusy} style={{ cursor: isBusy ? 'not-allowed' : 'pointer' }} className={buttonStyle} onClick={onButtonClick}>{buttonText}</button>
        </>
    );
}