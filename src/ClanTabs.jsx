import { CLANS_STRONGEST_FIRST } from './uniques';

export default function ClanTabs({activeClan, setActiveClan}) {
    return (
        <nav className="flex flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-8">
            {CLANS_STRONGEST_FIRST.map((clanName) => {
              const isSelected = activeClan === clanName;
              return (
                <button
                  key={clanName}
                  onClick={() => setActiveClan(clanName)}
                  className={`
                    px-5 py-2 border-2 font-bold text-xs transition-all duration-200 whitespace-nowrap
                    ${isSelected
                      ? `shadow-md bg-slate-50`
                      : `border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700`
                    }
                  `}
                >
                  {clanName}
                </button>
              );
            })}
        </nav>
    )
}