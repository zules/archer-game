export default function CardArt({ name, variant = null, isEnemy = true}) {
  const variantStr = variant ? `_${variant}` : "";

  const className = isEnemy ? "h-full object-contain" : "h-full object-contain scale-x-[-1]"

  return (
    <img
      src={`/images/cardart/${name.toLowerCase().replace(/\s+/g, '')}${variantStr}.jpg`}
      alt={name}
      className={className}
      onError={(e) => { e.target.src = '/images/cardart/placeholder.jpg' }}
    />
  )
}