
export default function Lane({topLaneMsg, midLaneMsg, botLaneMsg, topLaneArrows, midLaneArrows, botLaneArrows}) {


    return (
        <div className="lanes">
                <div key={1} className="lane">
                    <p className="arrows">{topLaneArrows}</p>
                    <p>{topLaneMsg}</p>
                </div>
                <div key={2} className="lane">
                    <p className="arrows">{midLaneArrows}</p>
                    <p>{midLaneMsg}</p>
                </div>
                <div key={3} className="lane">
                    <p className="arrows">{botLaneArrows}</p>
                    <p>{botLaneMsg}</p>
                </div>
        </div>
    );
}