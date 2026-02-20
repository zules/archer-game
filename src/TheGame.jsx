import { useState, useEffect } from "react";

import {
  randomArmy,
  initializeArmy,
  establishEngagedUnits,
  createAttackQueue,
  performAttacks,
} from "./battleCalcs";

import ArmyGrid from "./ArmyGrid.jsx";
import Lane from "./Lane.jsx";
import GameUI from "./GameUI.jsx";

// Set initial armies
const enemyArmyInitial = randomArmy();
const userArmyInitial = randomArmy();

export default function TheGame() {
  // Initialize state for both armies
  const [enemyArmy, setEnemyArmy] = useState(() =>
    initializeArmy(enemyArmyInitial, "enemy"),
  );
  const [userArmy, setUserArmy] = useState(() =>
    initializeArmy(userArmyInitial, "user"),
  );

  // Initialize game score
  const [userScore, setUserScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);

  // Individual Glory totals per row
  const [row1GloryTotal, setRow1GloryTotal] = useState(0);
  const [row2GloryTotal, setRow2GloryTotal] = useState(0);
  const [row3GloryTotal, setRow3GloryTotal] = useState(0);

  // Initialize game status
  const [isGameOver, setIsGameOver] = useState(false);
  console.log(`Rendering TheGame. Is game over? ${isGameOver}`);

  // Initialize turn by turn log
  const [turnLog, setTurnLog] = useState([]);

  // End initialization

  // Calculate glory and change game score
  // Check if any rows have been defeated
  const laneIds = {
    top: ["user-1", "user-4", "user-7", "enemy-1", "enemy-4", "enemy-7"],
    mid: ["user-2", "user-5", "user-8", "enemy-2", "enemy-5", "enemy-8"],
    bot: ["user-3", "user-6", "user-9", "enemy-3", "enemy-6", "enemy-9"],
  };

  const sumHealthInLane = (army, ids) =>
    army
      .filter((unit) => ids.includes(unit.instanceId))
      .reduce((total, unit) => total + unit.currentHp, 0);

  const row1UserHealthTotal = sumHealthInLane(userArmy, laneIds.top);
  const row2UserHealthTotal = sumHealthInLane(userArmy, laneIds.mid);
  const row3UserHealthTotal = sumHealthInLane(userArmy, laneIds.bot);

  const row1EnemyHealthTotal = sumHealthInLane(enemyArmy, laneIds.top);
  const row2EnemyHealthTotal = sumHealthInLane(enemyArmy, laneIds.mid);
  const row3EnemyHealthTotal = sumHealthInLane(enemyArmy, laneIds.bot);

  // Calculate glory scores
  useEffect(() => {
// Row 1
  if (row1UserHealthTotal <= 0 && row1EnemyHealthTotal > 0)
    {
      setRow1GloryTotal(enemyArmy
        .filter((unit) => laneIds.top.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row1EnemyHealthTotal <= 0 && row1UserHealthTotal > 0)
    {
      setRow1GloryTotal(userArmy
        .filter((unit) => laneIds.top.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row1EnemyHealthTotal <= 0 && row1UserHealthTotal <= 0) {
    throw new Error(`Error calculating glory for row 1.`);
  }
  // Row 2
  if (row2UserHealthTotal <= 0 && row2EnemyHealthTotal > 0)
    {
      setRow2GloryTotal(enemyArmy
        .filter((unit) => laneIds.mid.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row2EnemyHealthTotal <= 0 && row2UserHealthTotal > 0)
    {
      setRow2GloryTotal(userArmy
        .filter((unit) => laneIds.mid.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row2EnemyHealthTotal <= 0 && row2UserHealthTotal <= 0) {
    throw new Error(`Error calculating glory for row 2.`);
  }
  // Row 3
  if (row3UserHealthTotal <= 0 && row3EnemyHealthTotal > 0)
    {
      setRow3GloryTotal(enemyArmy
        .filter((unit) => laneIds.bot.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row3EnemyHealthTotal <= 0 && row3UserHealthTotal > 0)
    {
      setRow3GloryTotal(userArmy
        .filter((unit) => laneIds.bot.includes(unit.instanceId))
        .filter((unit) => unit.currentHp > 0)
        .reduce((total, unit) => total + unit.gly, 0)
      )
    }
  else if (row3EnemyHealthTotal <= 0 && row3UserHealthTotal <= 0) {
    throw new Error(`Error calculating glory for row 3.`);
  }
  },[turnLog]);

  // Determine outcome of each finished lane
  const [row1Victor, setRow1Victor] = useState(null);
  const [row2Victor, setRow2Victor] = useState(null);
  const [row3Victor, setRow3Victor] = useState(null);

  useEffect(() => {

    if (row1UserHealthTotal === 0) {
      setRow1Victor("enemy");
    }
    else if (row1EnemyHealthTotal === 0) {
      setRow1Victor("user");
    }
    if (row2UserHealthTotal === 0) {
      setRow2Victor("enemy");
    }
    else if (row2EnemyHealthTotal === 0) {
      setRow2Victor("user");
    }
    if (row3UserHealthTotal === 0) {
      setRow3Victor("enemy");
    }
    else if (row3EnemyHealthTotal === 0) {
      setRow3Victor("user");
    }

  },[turnLog]
  )

  // Update scores if victors have been decided
  useEffect(() => {
    if (row1Victor === "user") {
      setUserScore(prev => prev + row1GloryTotal)
    }
    else if (row1Victor === "enemy") {
      setEnemyScore(prev => prev + row1GloryTotal)
    }
  },[row1Victor])

    useEffect(() => {
    if (row2Victor === "user") {
      setUserScore(prev => prev + row2GloryTotal)
    }
    else if (row2Victor === "enemy") {
      setEnemyScore(prev => prev + row2GloryTotal)
    }
  },[row2Victor])

    useEffect(() => {
    if (row3Victor === "user") {
      setUserScore(prev => prev + row3GloryTotal)
    }
    else if (row3Victor === "enemy") {
      setEnemyScore(prev => prev + row3GloryTotal)
    }
  },[row3Victor])

  // Check if game is over

  const enemyHealthTotal = row1EnemyHealthTotal + row2EnemyHealthTotal + row3EnemyHealthTotal;
  const userHealthTotal = row1UserHealthTotal + row2UserHealthTotal + row3UserHealthTotal;

  useEffect(() => {
  if (!isGameOver) {
    if (enemyHealthTotal <= 0 || userHealthTotal <= 0) {
      setIsGameOver(true);
    }
  }
},[turnLog])

  // Handler for begin turn button

  function runTurn() {
    // Double check that game is not over
    if (isGameOver) return alert("Error: The game is over.");

    // Determine which units are engaged to attack this turn
    const readiedUserArmy = establishEngagedUnits(
      userArmy,
      userArmy,
      enemyArmy,
    );
    const readiedEnemyArmy = establishEngagedUnits(
      enemyArmy,
      userArmy,
      enemyArmy,
    );

    // Sort them
    const sortedAttackers = createAttackQueue(
      readiedUserArmy,
      readiedEnemyArmy,
    );

    // Perform attacks
    const { combatLog } = performAttacks(sortedAttackers, readiedUserArmy, readiedEnemyArmy);


        // Check if game is over
    if (sortedAttackers.length <= 0) {
      setIsGameOver(true);
    }

    setTurnLog(combatLog);
  }

  // Placeholders for messages in lanes
  const [topLaneMsg, setTopLaneMsg] = useState("");
  const [midLaneMsg, setMidLaneMsg] = useState("");
  const [botLaneMsg, setBotLaneMsg] = useState("");

  const [topLaneArrows, setTopLaneArrows] = useState("");
  const [midLaneArrows, setMidLaneArrows] = useState("");
  const [botLaneArrows, setBotLaneArrows] = useState("");

  // Animating results
  useEffect(() => {
    // Avoid infinite looping
    if (!turnLog || turnLog.length === 0) return;

    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runBattlePlayback = async (turnLog, isFirstRun = true) => {
      if (turnLog.length === 0) {
        // If this is the end, clear all active messages and indicators

        setUserArmy((prev) =>
          prev.map((unit) => ({ ...unit, engaged: false })),
        );
        setEnemyArmy((prev) =>
          prev.map((unit) => ({ ...unit, engaged: false })),
        );

        setTopLaneMsg("");
        setMidLaneMsg("");
        setBotLaneMsg("");
        setTopLaneArrows("");
        setMidLaneArrows("");
        setBotLaneArrows("");

        setTurnLog([]);

        return;
      }

      if (isFirstRun) {
        const initialUserEngagement = turnLog[0]?.userArmySnapshot;
        const initialEnemyEngagement = turnLog[0]?.enemyArmySnapshot;

        setUserArmy((prev) =>
          prev.map((unit, index) => ({
            ...unit,
            engaged: initialUserEngagement?.[index].engaged ?? false,
          })),
        );
        setEnemyArmy((prev) =>
          prev.map((unit, index) => ({
            ...unit,
            engaged: initialEnemyEngagement?.[index].engaged ?? false,
          })),
        );

        // Pause during each attack or ability
        await pause(1200);
      }

      const [currentEvent, ...remainingEvents] = turnLog;
      const {
        attacker,
        defender,
        attackPower,
        userArmySnapshot,
        enemyArmySnapshot,
        isSupereffective,
        abilityTriggered,
      } = currentEvent;
      const [side, positionStr] = attacker.split("-");
      const position = parseInt(positionStr);

      let message;
      if (attackPower === 0) {
        message = `${attacker} MISSED!`;
      }
      else if (attackPower != null) {
      message = `${attacker} shot ${defender} for ${attackPower} dmg.`;
      }
      else if (abilityTriggered === "rampaging" || abilityTriggered === "inspiring") {
        message = `${attacker} is ${abilityTriggered}!`
      }
      else if (abilityTriggered != null) {
        message = `${attacker} is ${abilityTriggered} to ${defender}.`
      }
      if (isSupereffective) {
        message += " SUPEREFFECTIVE 2X damage!";
      }

      let arrows;

      switch (side) {
        case "user":
          arrows = "←-";
          break;
        case "enemy":
          arrows = "-→";
          break;
      }

      if (abilityTriggered != null) {
        if (side === "user") {
          arrows = "█▒░";
        }
        else if (side === "enemy") {
          arrows = "░▒█";
        }
      }

      switch (position) {
        case 1:
        case 4:
        case 7:
          setTopLaneArrows(arrows);
          setMidLaneArrows("");
          setBotLaneArrows("");
          setTopLaneMsg(message);
          setMidLaneMsg("");
          setBotLaneMsg("");
          break;
        case 2:
        case 5:
        case 8:
          setTopLaneArrows("");
          setMidLaneArrows(arrows);
          setBotLaneArrows("");
          setTopLaneMsg("");
          setMidLaneMsg(message);
          setBotLaneMsg("");
          break;
        case 3:
        case 6:
        case 9:
          setTopLaneArrows("");
          setMidLaneArrows("");
          setBotLaneArrows(arrows);
          setTopLaneMsg("");
          setMidLaneMsg("");
          setBotLaneMsg(message);
          break;
        default:
      }
      console.log("Army snapshot rendering.");
      setUserArmy(userArmySnapshot);
      setEnemyArmy(enemyArmySnapshot);

      // Pause when units engage, on begin turn
      await pause(1000);

      await runBattlePlayback(remainingEvents, false);
    };

    runBattlePlayback(turnLog);
  }, [turnLog]);

  return (
    <>
      <header>
        <GameUI
          onButtonClick={runTurn}
          buttonText="Begin Turn"
          turnLog={turnLog}
          isGameOver={isGameOver}
          userScore={userScore}
          enemyScore={enemyScore}
        />
      </header>
      <main className="flex items-center justify-center">
        <ArmyGrid className="enemy army" units={enemyArmy} />
        <Lane
          topLaneMsg={topLaneMsg}
          midLaneMsg={midLaneMsg}
          botLaneMsg={botLaneMsg}
          topLaneArrows={topLaneArrows}
          midLaneArrows={midLaneArrows}
          botLaneArrows={botLaneArrows}
          row1Victor={row1Victor}
          row2Victor={row2Victor}
          row3Victor={row3Victor}
          row1GloryTotal={row1GloryTotal}
          row2GloryTotal={row2GloryTotal}
          row3GloryTotal={row3GloryTotal}
        />
        <ArmyGrid className="user army" units={userArmy} />
      </main>
    </>
  );
}
