import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="flex flex-col spacing-50 justify-center items-center">
        <h1>Home</h1>
        <Link className="my-40" to="/newgame">Start Game Over</Link>
        <Link to="/game">Random Match</Link>
        </div>
    )
}