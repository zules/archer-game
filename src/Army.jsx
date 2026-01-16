import Unit from './Unit.jsx';

export default function Army(props) {
    return (
        <div className={props.className}>
            <Unit id="1" />
            <Unit id="2" />
            <Unit id="3" />
            <Unit id="4" />
            <Unit id="5" />
            <Unit id="6" />
            <Unit id="7" />
            <Unit id="8" />
            <Unit id="9" />
        </div>
    )
}