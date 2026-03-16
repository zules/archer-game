import Scoreboard from "./Scoreboard.jsx";
import { Link } from 'react-router-dom'

export default function GameUI({ onButtonClick, buttonText, isGameOver, userScore, enemyScore, turnLog, gameWinner, turnNumber, enemyName, enemyIntro, enemyOnLose, enemyOnWin }) {

    const buttonStyle = "px-6 py-2 border border-blue-400 hover:bg-blue-50 rounded-lg focus:ring focus:ring-red-300"
    const isBusy = isGameOver || turnLog.length > 0;

    const formatGameWinner = gameWinner?.charAt(0).toUpperCase() + gameWinner?.slice(1)

    const dialogue = turnNumber === 0 ? enemyIntro : !isGameOver ? "..." : gameWinner === "user" ? enemyOnLose : enemyOnWin;

    return (
        <>
            <Link to="/"><h3 className="text-red-500 font-bold">Quit Game and Go Home</h3></Link>
            <div className="flex gap-20 items-center justify-center w-full">
                <div className="flex flex-col flex-1 max-w-xl">
                    <p>{enemyName} says, "{dialogue}"</p>
                </div>
                <div className="flex flex-col my-2 gap-2 flex-1 max-w-xl">
            <Scoreboard userScore={userScore} enemyScore={enemyScore} />
            { !isGameOver ? <button disabled={isBusy} style={{ cursor: isBusy ? 'not-allowed' : 'pointer' }} className={buttonStyle} onClick={onButtonClick}>{buttonText}</button>
            : <Link to="/" className="text-center px-6 py-2 border border-red-100 hover:bg-red-50 rounded-lg focus:ring focus:ring-red-300">{formatGameWinner} has won! Return Home</Link>
    }
            </div></div>
        </>
    );
}