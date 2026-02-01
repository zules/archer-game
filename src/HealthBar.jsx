export default function HealthBar ({currentHp, hp}) {

    const healthPercentage = Math.max(0, Math.min(100, (currentHp / hp) * 100))

    const containerStyle = {
        height: '10px',
        width: '100%',
        backgroundColor: '#9b1414',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '5px',
    };

    const barStyle = {
        height: '100%',
        width: `${healthPercentage}%`,
        backgroundColor: '#44ff44',
        transition: 'width 0.5s linear',
    };

    return (
        <>
            <p>HP: {currentHp} / {hp}</p>
            <div style={containerStyle}>
                <div style={barStyle}></div>
            </div>
        </>
    )

}