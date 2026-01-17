import { UNIQUES } from './uniques';

const unitLookup = new Map(UNIQUES);

export default function Unit(props) {
    return (
        <div className={`unit ${props.id}`}>
            <p>{unitLookup.get(props.id).name}</p>
        </div>
    );
}