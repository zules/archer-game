export default function ClanIcon ({ clan, className = "w-12 h-12" }) {
    return (
  <img
    src={`/images/clanicon_${clan.toLowerCase()}.png`}
    alt={`${clan} clan`}
    className={className}
  />
)}