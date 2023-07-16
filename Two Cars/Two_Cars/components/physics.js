import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getobstpos } from "../utils/random";
import { useEffect } from "react";
import Obstacles from "./Obstacles";

const { width, height } = Dimensions.get("window");
var obstacleIndex = 1;
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  if (entities.obstacleIndex === undefined) {
    entities.obstacleIndex = 1;
  }

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      let touchX = t.event.pageX;
      const { carLeft, carRight } = entities;
      if (touchX < width / 2) {
        const carpos =
          carLeft.body.position.x === width / 8 ? (3 * width) / 8 : width / 8;
        const pos = { x: carpos, y: height - 50 };
        Matter.Body.setPosition(carLeft.body, pos, (updateVelocity = false));
      } else {
        const carpos =
          carRight.body.position.x === (5 * width) / 8
            ? (7 * width) / 8
            : (5 * width) / 8;
        const pos = { x: carpos, y: height - 50 };
        Matter.Body.setPosition(carRight.body, pos, (updateVelocity = false));
      }
    });

  Matter.Engine.update(engine, time.delta);
  for (let i = 1; i <= 4; i++) {
    if (
      entities[`ObstacleLeft${i}`].body.bounds.max.y >= height &&
      entities[`ObstacleLeft${i}`].point != true
    ) {
      entities[`ObstacleLeft${i}`].point = true;

      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleLeft${i}`].body.bounds.max.y >= height + 30) {
      entities[`ObstacleLeft${i}`].point = false;
      const obstpos = getobstpos("left");
      Matter.Body.setPosition(
        entities[`ObstacleLeft${i}`].body,
        { x: obstpos, y: -height },
        (updateVelocity = false)
      );
    }
    if (
      entities[`ObstacleRight${i}`].body.bounds.max.y >= height &&
      entities[`ObstacleRight${i}`].point != true
    ) {
      entities[`ObstacleRight${i}`].point = true;

      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleRight${i}`].body.bounds.max.y >= height + 30) {
      entities[`ObstacleRight${i}`].point = false;
      const obstpos = getobstpos("right");
      Matter.Body.setPosition(
        entities[`ObstacleRight${i}`].body,
        { x: obstpos, y: -height },
        (updateVelocity = false)
      );
    }

    // Matter.Body.translate(entities[`ObstacleLeft${i}`].body, { x: 0, y: 6 });
    Matter.Body.setVelocity(entities[`ObstacleLeft${i}`].body, { x: 0, y: 5 });
    Matter.Body.setVelocity(entities[`ObstacleRight${i}`].body, { x: 0, y: 5 });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
  });

  return entities;
};
export default Physics;
