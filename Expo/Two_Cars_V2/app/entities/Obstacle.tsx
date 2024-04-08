import { Rect } from "@shopify/react-native-skia";
import { useEffect } from "react";
import {
  Easing,
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ObstacleProps {
  id: number;
  positionX: SharedValue<number>;
  positionY: SharedValue<number>;
}

const Obstacle = ({ id, positionX, positionY }: ObstacleProps) => {
  return (
    <Rect x={positionX} y={positionY} width={30} height={30} color="red" />
  );
};

export default Obstacle;
