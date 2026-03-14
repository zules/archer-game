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

export default function HealthBar({ currentHp, hp, }) {
  // Calculate the width percentage dynamically
  const healthPercentage = Math.max(0, Math.min(100, (currentHp / hp) * 100));

  return (
    <div dir="ltr" className="relative bg-white border border-black rounded-full h-5 overflow-hidden shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]">

      <div
        className="absolute left-0 top-0 h-full bg-red-300 transition-[width] duration-500 ease-linear shadow-[inset_0_2px_6px_0_rgba(0,0,0,0.4)]"
        style={{ width: `${healthPercentage}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black">
        {currentHp} / {hp} HP
      </div>

    </div>
  );
}