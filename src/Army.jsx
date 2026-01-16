import Unit from './Unit.jsx';

export default function Army(props) {
    const unitNums = Array.from({ length: 9 }, (_, i) => i + 1);

    const unitNames = props.className === "enemy army"
        //enemy names
        ? ["Ernie", "Seth", "Luna", "Zane", "Mira", "Jax", "Nia", "Kade", "Vera"]
        //user names
        : ["Michael", "Burt", "Cid", "Dax", "Emi", "Finn", "Gia", "Hope", "Ike"];

    return (
        <div className={props.className}>
        {unitNums.map((id) => (
            <Unit key={id} id={id} name={unitNames[id - 1]} />
        ))}
        </div>
    )
}