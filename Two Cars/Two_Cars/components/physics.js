import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getobstpos } from "../utils/random";
const { width, height } = Dimensions.get("window");
let count = 0;
let multiplier = 3;
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      count++;
      if (count % 2 == 0) multiplier = 1;
      else multiplier = 3;
      const pos = { x: (multiplier * width) / 8, y: height - 80 };
      Matter.Body.setPosition(entities.Car.body, pos, (updateVelocity = false));
    });

  Matter.Engine.update(engine, time.delta);
  for (let i = 1; i <= 4; i++) {
    if (
      entities[`ObstacleLeft${i}`].body.bounds.max.y >= height + 80 &&
      entities[`ObstacleLeft${i}`].point != true
    ) {
      entities[`ObstacleLeft${i}`].point = true;

      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleLeft${i}`].body.bounds.max.y >= height + 80) {
      entities[`ObstacleLeft${i}`].point = false;
      const obstpos = getobstpos();
      Matter.Body.setPosition(
        entities[`ObstacleLeft${i}`].body,
        { x: obstpos, y: -80 - height / 2 },
        (updateVelocity = false)
      );
    }

    Matter.Body.translate(entities[`ObstacleLeft${i}`].body, { x: 0, y: 8 });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
  });

  return entities;
};
export default Physics;
