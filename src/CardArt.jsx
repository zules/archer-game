export default function CardArt({ name, variant = null, isEnemy}) {
  const variantStr = variant ? `_${variant}` : "";

  const className = isEnemy ? "h-full object-contain" : "h-full object-contain scale-x-[-1]"

  console.log(`Attempting to render ${name.toLowerCase().replace(/\s+/g, '')}${variantStr}.jpg`)
  return (
    <img
      src={`/images/cardart/${name.toLowerCase().replace(/\s+/g, '')}${variantStr}.jpg`}
      alt={name}
      className={className}
      onError={(e) => { e.target.src = '/images/cardart/placeholder.jpg' }}
    />
  )
}