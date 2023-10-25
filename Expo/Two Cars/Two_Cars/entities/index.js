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
  const obstposleft = new Array();
  const obstposright = new Array();

  for (let i = 1; i <= 4; i++) {
    obstposleft[i] = getobstpos("left");
    obstposright[i] = getobstpos("right");
  }

  return {
    physics: { engine, world },
    carLeft: Car(
      world,
      "red",
      { x: (3 * width) / 8, y: height - 50 },
      { height: 70, width: 50 }
    ),
    carRight: Car(
      world,
      "blue",
      { x: (5 * width) / 8, y: height - 50 },
      { height: 70, width: 50 }
    ),
    ObstacleLeft1: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstposleft[1], y: 0 },
      { height: 30, width: 30 }
    ),
    ObstacleLeft2: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstposleft[2], y: 0 - height / 2 },
      { height: 30, width: 30 }
    ),
    ObstacleLeft3: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstposleft[3], y: 0 - height },
      { height: 30, width: 30 }
    ),
    ObstacleLeft4: Obstacles(
      world,
      "ObstacleLeft1",
      "green",
      { x: obstposleft[1], y: 0 - (3 * height) / 2 },
      { height: 30, width: 30 }
    ),
    ObstacleRight1: Obstacles(
      world,
      "ObstacleRight1",
      "green",
      { x: obstposright[1], y: 0 },
      { height: 30, width: 30 }
    ),
    ObstacleRight2: Obstacles(
      world,
      "ObstacleRight2",
      "green",
      { x: obstposright[2], y: -height / 2 },
      { height: 30, width: 30 }
    ),
    ObstacleRight3: Obstacles(
      world,
      "ObstacleRight3",
      "green",
      { x: obstposright[3], y: -height },
      { height: 30, width: 30 }
    ),
    ObstacleRight4: Obstacles(
      world,
      "ObstacleRight4",
      "green",
      { x: obstposright[4], y: (-3 * height) / 2 },
      { height: 30, width: 30 }
    ),
  };
};
