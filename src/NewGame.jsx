import { Link } from 'react-router-dom'
import { useState } from "react";
import ClanIcon from './ClanIcon'

export default function NewGame() {

const [starterClan, setStarterClan] = useState(null);

function selectClan(clan) {
    setStarterClan(clan);
}

const tableStyling = "py-2 px-4";
const iconStyling = "w-20"
const trStylingHover = "hover:bg-gray-200";
const trStylingSelected = "bg-blue-50"
const buttonStyling = "border border-blue-400 rounded-lg py-2 hover:bg-blue-50"

    return (
        <div className="flex flex-col items-center justify-center">
        <h1>Choose a clan</h1>
        <p className="my-6">Chosen clan: {starterClan}</p>
        <table className="border w-3xl divide-y divide-gray-600 text-sm">
            <tbody className="divide-y divide-gray-100 bg-white">
            <tr className={starterClan === "Scarestare" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Scarestare</td>
                <td className={tableStyling}><ClanIcon clan="scarestare" className={iconStyling} /></td>
                <td className={tableStyling}>You can't make them blink. You can't get them out of your nightmares. Supereffective against Secretkeep.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Scarestare")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Secretkeep" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Secretkeep</td>
                <td className={tableStyling}><ClanIcon clan="secretkeep" className={iconStyling} /></td>
                <td className={tableStyling}>They live for the night, the quiet. Stealthy, solemn, and deadly. Supereffective against Formstorm.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Secretkeep")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Formstorm" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Formstorm</td>
                <td className={tableStyling}><ClanIcon clan="formstorm" className={iconStyling} /></td>
                <td className={tableStyling}>Nothing is more important to them than bodily strength and agility. Supereffective against Watercross.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Formstorm")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Watercross" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Watercross</td>
                <td className={tableStyling}><ClanIcon clan="watercross" className={iconStyling} /></td>
                <td className={tableStyling}>From creeks to the ocean, they use the water as their mentor and ally. Supereffective against Beatleap.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Watercross")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Beatleap" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Beatleap</td>
                <td className={tableStyling}><ClanIcon clan="beatleap" className={iconStyling} /></td>
                <td className={tableStyling}>Filled with life's vitality, their fighting is akin to dancing and play. Supereffective against Skymind.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Beatleap")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Skymind" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Skymind</td>
                <td className={tableStyling}><ClanIcon clan="skymind" className={iconStyling} /></td>
                <td className={tableStyling}>They watch the heavens for wisdom and guidance. They always seek more understanding. Supereffective against Fossilcall.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Skymind")}>Choose Clan</button></td>
            </tr>
            <tr className={starterClan === "Fossilcall" ? trStylingSelected : trStylingHover}>
                <td className={tableStyling}>Fossilcall</td>
                <td className={tableStyling}><ClanIcon clan="fossilcall" className={iconStyling} /></td>
                <td className={tableStyling}>They operate on pure instinct. They've channeled ancient, unfathomable ways. Supereffective against Scarestare.</td>
                <td className={tableStyling}><button className={buttonStyling} onClick={() => selectClan("Fossilcall")}>Choose Clan</button></td>
            </tr>
            </tbody>
        </table>
        <Link className="my-4 py-4 px-5 text-xl text-blue-600 border border-slate-400" to="/">Continue</Link>
        </div>
    )
}