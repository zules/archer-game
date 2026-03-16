import { Link } from 'react-router-dom'
import { useLocalStorage } from "@uidotdev/usehooks"
import { getEnemyOrder } from "./dashboardCalcs";
import { ENEMY_DECKS } from './campaign';
import { useNavigate } from 'react-router-dom';

export default function Home() {

const [savedClan] = useLocalStorage("savedClan", null);
const [defeatedEnemies] = useLocalStorage("defeatedEnemies", []);
const orderedClans = getEnemyOrder(savedClan);

const navigate = useNavigate();

const orderedNames = orderedClans.flatMap(clan => {
  const entry = ENEMY_DECKS.find(deck => deck[clan]);
  return entry ? entry[clan].map(enemy => enemy.Name) : [];
});

const orderedPayouts = orderedClans.flatMap(clan => {
  const entry = ENEMY_DECKS.find(deck => deck[clan]);
  return entry ? entry[clan].map(enemy => enemy.Payout) : [];
});

// Currency
const [scarestareCoins] = useLocalStorage("scarestareCoins", 0);
const [secretkeepCoins] = useLocalStorage("secretkeepCoins", 0);
const [formstormCoins] = useLocalStorage("formstormCoins", 0);
const [watercrossCoins] = useLocalStorage("watercrossCoins", 0);
const [beatleapCoins] = useLocalStorage("beatleapCoins", 0);
const [skymindCoins] = useLocalStorage("skymindCoins", 0);
const [fossilcallCoins] = useLocalStorage("fossilcallCoins", 0);



    return (
        <div className="flex flex-col justify-center items-center">
        <h1>Home</h1>
        <Link className="my-10 text-red-600" to="/newgame">Start Over (wipes cards and resets everything)</Link>
        <div className="flex w-4xl">
            <div className="flex-1"><h2 className="text-2xl pb-4">My stuff</h2>
            <h3 className="text-lg">Moneys</h3>
            <div>
                <p>Scarestare coins: {scarestareCoins}</p>
                <p>Secretkeep coins: {secretkeepCoins}</p>
                <p>Formstorm coins: {formstormCoins}</p>
                <p>Watercross coins: {watercrossCoins}</p>
                <p>Beatleap coins: {beatleapCoins}</p>
                <p>Skymind coins: {skymindCoins}</p>
                <p>Fossilcall coins: {fossilcallCoins}</p>
            </div>
            </div>
            <div className="flex-1"><h2 className="text-2xl pb-4">Battle</h2>
        <Link to="/game"><p className="border border-blue-400 p-5 w-fit">Random Match</p></Link>
        <p>Choose an enemy:</p><div className="flex flex-col gap-3">
        {orderedNames.map((name, i) => {
            const defeated = defeatedEnemies?.includes(name);
            const prevDefeated = i === 0 || defeatedEnemies?.includes(orderedNames[i - 1]);
            const unlocked = defeated || prevDefeated;
            return unlocked ? (
            <p className={defeated ? `text-center py-2 border border-gray-500 bg-gray-200` : `text-center py-2 border border-gray-500` } key={i} onClick={() => navigate('/game', { state: { enemyName: name } })} style={{ cursor: 'pointer' }}>
            {defeated ? `✓ ${name}` : name}, Payout: {orderedPayouts[i]}
            </p>
            ) : (
            <p key={i}>???</p>
            );
            })}
            </div></div>
        </div>
        </div>
    )
}