export default function ClanIcon ({ clan, className = "w-12 h-12", isEnemy }) {

  className = isEnemy ? className : `${className} scale-x-[-1]`
    return (
  <img
    src={`/images/clanicon_${clan.toLowerCase()}.png`}
    alt={`${clan} clan`}
    className={className}
  />
)}