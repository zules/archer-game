export default function GameUI({ onButtonClick }) {
    return (
        <button className="start-turn" onClick={onButtonClick}>Begin Turn</button>
    );
}