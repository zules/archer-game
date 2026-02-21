// export default function HealthBar ({currentHp, hp}) {

//     const healthPercentage = Math.max(0, Math.min(100, (currentHp / hp) * 100))

//     const containerStyle = {
//         height: '10px',
//         width: '100%',
//         backgroundColor: '#9b1414',
//         borderRadius: '5px',
//         overflow: 'hidden',
//         marginTop: '5px',
//     };

//     const barStyle = {
//         height: '100%',
//         width: `${healthPercentage}%`,
//         backgroundColor: '#44ff44',
//         transition: 'width 0.5s linear',
//     };

//     return (
//         <>
//             <p>HP: {currentHp} / {hp}</p>
//             <div style={containerStyle}>
//                 <div style={barStyle}></div>
//             </div>
//         </>
//     )

// }

export default function HealthBar({ currentHp, hp }) {
  // Calculate the width percentage dynamically
  const healthPercentage = Math.max(0, Math.min(100, (currentHp / hp) * 100));

  return (
    <div className="relative bg-white rounded-full h-6 overflow-hidden shadow-inner">
      
      <div 
        className="absolute left-0 top-0 h-full bg-red-300 transition-[width] duration-500 ease-linear"
        style={{ width: `${healthPercentage}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black drop-shadow-md">
        {currentHp} / {hp} HP
      </div>
      
    </div>
  );
}