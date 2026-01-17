import { UNIQUES } from './uniques';

const unitLookup = new Map(UNIQUES);

export default function Unit(props) {
    return (
        <div className={`unit ${props.id}`}>
            <p>{unitLookup.get(props.id).name}</p>
            <div className="stats">
                <p>ATK: {unitLookup.get(props.id).atk}</p>
                <p>HP: {unitLookup.get(props.id).health}</p>
                <p>SPD: {unitLookup.get(props.id).speed}</p>
            </div>
        </div>
    );
}