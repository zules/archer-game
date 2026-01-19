export default function GameUI({ onButtonClick, buttonText }) {
    return (
        <button className="start-turn" onClick={onButtonClick}>{buttonText}</button>
    );
}