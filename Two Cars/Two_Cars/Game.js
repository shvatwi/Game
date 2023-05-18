import React from "react";
import { GameEngine } from "react-native-game-engine";
import Physics from "./components/physics";
import entities from "./entities";

export default function Game({
  running,
  setRunning,
  currentPoints,
  setCurrentPoints,
  gameEngine,
  setGameEngine,
}) {
  return (
    <GameEngine
      ref={(ref) => {
        setGameEngine(ref);
      }}
      systems={[Physics]}
      entities={entities()}
      running={running}
      onEvent={(e) => {
        switch (e.type) {
          case "game_over":
            setRunning(false);
            gameEngine.stop();
            break;
          case "new_point":
            console.log(currentPoints);
            setCurrentPoints(currentPoints + 1);
            break;
        }
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    ></GameEngine>
  );
}
