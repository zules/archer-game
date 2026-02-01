
export default function Lane({topLaneMsg, midLaneMsg, botLaneMsg, topLaneArrows, midLaneArrows, botLaneArrows}) {

    let arrowClass
    
    if (topLaneArrows === "←-" || midLaneArrows === "←-" || botLaneArrows === "←-") {
        arrowClass = "arrows arrow-fling-left";
    }
    else if (topLaneArrows === "-→" || midLaneArrows === "-→" || botLaneArrows === "-→") {
        arrowClass = "arrows arrow-fling-right";
    }

    return (
        <div className="lanes">
                <div className="lane">
                    <p className={topLaneArrows && arrowClass}>{topLaneArrows}</p>
                    <p>{topLaneMsg}</p>
                </div>
                <div className="lane">
                    <p className={midLaneArrows && arrowClass}>{midLaneArrows}</p>
                    <p>{midLaneMsg}</p>
                </div>
                <div className="lane">
                    <p className={botLaneArrows && arrowClass}>{botLaneArrows}</p>
                    <p>{botLaneMsg}</p>
                </div>
        </div>
    );
}