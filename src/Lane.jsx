
export default function Lane({topLaneMsg, midLaneMsg, botLaneMsg, topLaneArrows, midLaneArrows, botLaneArrows,
    row1Victor, row2Victor, row3Victor, row1GloryTotal, row2GloryTotal, row3GloryTotal}) {

    let arrowClass
    
    if (topLaneArrows === "←-" || midLaneArrows === "←-" || botLaneArrows === "←-") {
        arrowClass = "arrows arrow-fling-left";
    }
    else if (topLaneArrows === "-→" || midLaneArrows === "-→" || botLaneArrows === "-→") {
        arrowClass = "arrows arrow-fling-right";
    }

    function victoryMessage (rowVictor, gloryTotal) {
        if (rowVictor != null) {
            return `${rowVictor} has earned ${gloryTotal} glory!`;
        }
        return "";
    }

    const row1VictoryMessage = victoryMessage(row1Victor, row1GloryTotal);
    const row2VictoryMessage = victoryMessage(row2Victor, row2GloryTotal);
    const row3VictoryMessage = victoryMessage(row3Victor, row3GloryTotal);

    return (
        <div className="lanes">
                <div className="lane">
                    <p className={topLaneArrows && arrowClass}>{topLaneArrows}</p>
                    <p>{row1VictoryMessage}{topLaneMsg}</p>
                </div>
                <div className="lane">
                    <p className={midLaneArrows && arrowClass}>{midLaneArrows}</p>
                    <p>{row2VictoryMessage}{midLaneMsg}</p>
                </div>
                <div className="lane">
                    <p className={botLaneArrows && arrowClass}>{botLaneArrows}</p>
                    <p>{row3VictoryMessage}{botLaneMsg}</p>
                </div>
        </div>
    );
}