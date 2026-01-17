import Battlefield from './Battlefield.jsx'
import Lane from './Lane.jsx'

export default function TheGame () {

        const enemyArmy = ["04", "01", "03", "01", "01", "01", "01", "01", "01"];
        const userArmy = ["02", "03", "02", "03", "02", "03", "02", "03", "01"];

        return (
            <>
                <main className="playing-field">
                    <Battlefield className="enemy army" units={enemyArmy} />
                    <Lane />
                    <Battlefield className="user army" units={userArmy} />
                </main>
            </>
        );
    
}