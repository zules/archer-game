import { UNIQUES } from './uniques';

export default function Unit(props) {
    
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
                <p>{UNIQUES.get(id).flavor}</p>
            </div>
        </div>
    );
}