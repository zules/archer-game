import { Link } from 'react-router-dom'
import { useLocalStorage } from "@uidotdev/usehooks"
import { getEnemyOrder } from "./dashboardCalcs";
import { ENEMY_DECKS } from './campaign';
import { useNavigate } from 'react-router-dom';

export default function Home() {

const [savedClan] = useLocalStorage("savedClan", null);
const [defeatedEnemies] = useLocalStorage("defeatedEnemies", null);
const orderedClans = getEnemyOrder(savedClan);

const navigate = useNavigate();

const orderedNames = orderedClans.flatMap(clan => {
  const entry = ENEMY_DECKS.find(deck => deck[clan]);
  return entry ? entry[clan].map(enemy => enemy.Name) : [];
});

    return (
        <div className="flex flex-col spacing-50 justify-center items-center">
        <h1>Home</h1>
        <Link className="my-10" to="/newgame">Start Over (wipes cards and resets everything)</Link>
        <Link to="/game">Random Match</Link>
        <p>Choose an enemy:</p>
        {orderedNames.map((name, i) => {
            const defeated = defeatedEnemies?.includes(name);
            const prevDefeated = i === 0 || defeatedEnemies?.includes(orderedNames[i - 1]);
            const unlocked = defeated || prevDefeated;
            return unlocked ? (
            <p key={i} onClick={() => navigate('/game', { state: { enemyName: name } })} style={{ cursor: 'pointer' }}>
            {defeated ? `✓ ${name}` : name}
            </p>
            ) : (
            <p key={i}>???</p>
            );
            })}
        </div>
    )
}