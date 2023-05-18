import Matter from "matter-js";
import { Dimensions } from "react-native";
import Car from "../components/Car";
import Obstacles from "../components/Obstacles";
import { getobstpos } from "../utils/random";

const { width, height } = Dimensions.get("window");

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  engine.gravity.scale = 0;
  let world = engine.world;

  const obstpos1 = getobstpos();
  const obstpos2 = getobstpos();
  const obstpos3 = getobstpos();
  const obstpos4 = getobstpos();

  return {
    physics: { engine, world },
    Car: Car(
      world,
      "red",
      { x: width / 8, y: height - 80 },
      { height: 70, width: 60 }
    ),
    ObstacleLeft1: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstpos1, y: -80 },
      { height: 30, width: 30 }
    ),
    ObstacleLeft2: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstpos2, y: -80 - height / 2 },
      { height: 30, width: 30 }
    ),
    ObstacleLeft3: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstpos3, y: -80 - height },
      { height: 30, width: 30 }
    ),
    ObstacleLeft4: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstpos4, y: -80 - (3 * height) / 2 },
      { height: 30, width: 30 }
    ),
  };
};
