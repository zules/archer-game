import Unit from './Unit.jsx';

export default function Army(props) {
    const unitNums = Array.from({ length: 9 }, (_, i) => i + 1);
    return (
        <div className={props.className}>
        {unitNums.map((id) => (
            <Unit key={id} id={id} />
        ))}
        </div>
    )
}