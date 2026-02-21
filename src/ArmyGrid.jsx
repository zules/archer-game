export default function ArmyGrid({ direction, bgColor, children }) {
  return (
    <div 
      dir={direction} 
      className={`grid grid-rows-3 grid-cols-3 grid-flow-col ${bgColor}`}
    >
      {children}
    </div>
  );
}