export default function Scoreboard({ userScore, enemyScore }) {
    return (
        <div className="w-full items-center justify-center flex text-2xl font-bold gap-30">
            <h3>Enemy Glory: {enemyScore}</h3>
            <h3>User Glory: {userScore}</h3>
        </div>
    );
}