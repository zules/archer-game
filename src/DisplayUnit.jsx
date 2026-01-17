import { UNIQUES } from './uniques';

export default function DisplayUnit(props) {

    const id = props.id;

    return (
        <div className={`unit ${id}`}>
            <p>{UNIQUES.get(id).name}</p>
            <div className="stats">
                <p>ATK: {UNIQUES.get(id).atk}</p>
                <p>HP: {UNIQUES.get(id).health}</p>
                <p>SPD: {UNIQUES.get(id).speed}</p>
            </div>
            <div className="flavor-text">
                <p className="flavor-text">{UNIQUES.get(id).flavor}</p>
            </div>
        </div>
    );
}