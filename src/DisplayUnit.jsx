import HealthBar from './HealthBar'
import ClanIcon from './ClanIcon'
import CardArt from './CardArt'

const clanThemes = {
  scarestare: { boldBorder: "border-purple-900", primaryBackground: "bg-purple-900", textOnBackground: "text-white", lightBackground: "bg-purple-100" },
  watercross: { boldBorder: "border-teal-300", primaryBackground: "bg-teal-300", textOnBackground: "text-black", lightBackground: "bg-teal-100" },
  fossilcall: { boldBorder: "border-yellow-900", primaryBackground: "bg-yellow-900", textOnBackground: "text-white", lightBackground: "bg-yellow-50" },
  beatleap: { boldBorder: "border-red-500", primaryBackground: "bg-red-500", textOnBackground: "text-white", lightBackground: "bg-red-100" },
  skymind: { boldBorder: "border-orange-300", primaryBackground: "bg-orange-300", textOnBackground: "text-black", lightBackground: "bg-orange-100" },
  formstorm: { boldBorder: "border-stone-200", primaryBackground: "bg-stone-200", textOnBackground: "text-black", lightBackground: "bg-stone-50" },
  secretkeep: { boldBorder: "border-blue-800", primaryBackground: "bg-blue-800", textOnBackground: "text-white", lightBackground: "bg-blue-100" },
};

        // Check if changeable stats should be marked as buffed or debuffed
const statusModifiers = {
  buffed:   { color: 'text-lime-500', symbol: '▲ ' },
  debuffed: { color: 'text-red-600', symbol: '▼ ' },
  default:  { color: 'text-black', symbol: '' } // Handles the "no change" state
};
function getStatStatus(baseValue, currentValue) {
    if (baseValue < currentValue) return "buffed";
    if (baseValue > currentValue) return "debuffed";
    return "default";
    }


export default function DisplayUnit({unitData, isEnemy = false}) {

        const { name, atk, currentHp, hp, spd, clan, acc, gly, abil, baseAcc, baseAtk, baseGly } = unitData;

        const theme = clanThemes[clan.toLowerCase()]

        const unitAliveness = currentHp <= 0 ? "opacity-40 grayscale" : "";
  const unitEngagement = unitData.engaged ? "ring-4 ring-red-600 ring-offset-2 scale-105 z-10 shadow-lg shadow-red-600/50 transition-all duration-200" : "";

        const ability = Object.values(abil).flat();

        if (ability.length > 1) {
            throw new Error (`Unit ${name} unexpectedly has more than 1 ability.`)
        }

        const amountDisplay = ability[0]?.amount != null && ability[0].amount < 1
        ? `${ability[0].amount * 100}%`
        : ability[0]?.amount;


// 1. Get the string ("buffed", "debuffed", or "default")
  const atkStatus = getStatStatus(baseAtk, atk);
  const accStatus = getStatStatus(baseAcc, acc);
  const glyStatus = getStatStatus(baseGly, gly);

  // 2. Look up the exact styling object from the dictionary
  const atkDisplay = statusModifiers[atkStatus];
  const accDisplay = statusModifiers[accStatus];
  const glyDisplay = statusModifiers[glyStatus];


        return (


            <>
                <div className={`w-54 h-72 m-2 rounded-2xl overflow-hidden border-2 border-black bg-white ${unitAliveness} ${unitEngagement}`}>
                    <div className={`text-center py-1 border-b-4 ${theme.boldBorder}`}>
                    <div className="text-l">{name}</div>
                </div>
                <div className="flex">
                  <div className="h-52">
                <CardArt name={name} isEnemy={isEnemy} /></div>
      <div className={`w-1/3 ${theme.lightBackground} flex flex-col flex-1`}>
        <div className="py-1 border-b border-black flex items-center justify-center text-xs">
          <ClanIcon clan={clan} className="w-9 h-9" />
        </div>

        <div className={`${theme.primaryBackground} ${theme.textOnBackground} text-center pb-1 text-sm truncate`}>
          SPD: {spd}
        </div>

<div className={`text-center text-lg ${atkDisplay.color} truncate`}>
        {atkDisplay.symbol}ATK: {atk}
      </div>


<div className={`text-center py-1 text-sm ${accDisplay.color} truncate`}>
        {accDisplay.symbol}ACC: {acc}%
      </div>


<div className={`bg-yellow-100 text-center py-1 mb-3 ${glyDisplay.color} truncate`}>
        {glyDisplay.symbol}GLY: {gly}
      </div>


        <div className="text-center font-bold text-xs pb-1 h-9 leading-tight">
          {ability[0] && <p>{ability[0].effect} ({amountDisplay})</p>}
        </div>

      </div>

    </div>


    <div className="bg-fuchsia-800 p-3">

<HealthBar currentHp={currentHp} hp={hp} />

    </div>
</div>
</>



    );
}