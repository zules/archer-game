export default function Scoreboard({ userScore, enemyScore }) {
    return (
        <div className="scoreboard">
            <h3>Enemy Glory: {enemyScore}</h3>
            <h3>User Glory: {userScore}</h3>
        </div>
    );
}