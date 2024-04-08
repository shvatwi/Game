import { Canvas, Rect } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Obstacle from "./entities/Obstacle";
import Car from "./entities/Car";
import { getRandomLeft, getRandomRight } from "./utils/random";

const { width, height } = Dimensions.get("screen");

interface GameProps {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

function Game(props: GameProps): JSX.Element {
  const MARGIN = width / 16;
  const carHeight = width / 4;
  const carwidth = width / 4 - width / 16;

  const car1LeftPos = width / 8 - carwidth / 2;
  const car1RightPos = (3 * width) / 8 - carwidth / 2;
  const car2LeftPos = (5 * width) / 8 - carwidth / 2;
  const car2RightPos = (7 * width) / 8 - carwidth / 2;
  const carPos1 = useSharedValue("left");
  const carPos2 = useSharedValue("left");

  const carPos1x = useSharedValue(car1LeftPos);
  const carPos2x = useSharedValue(car2LeftPos);

  const tap = Gesture.Tap().onStart((e) => {
    if (e.x < width / 2) {
      //   console.log("aa");
      if (carPos1.value === "left") {
        carPos1.value = "right";
        carPos1x.value = withTiming(car1RightPos, { duration: 200 });
      } else {
        carPos1.value = "left";
        carPos1x.value = withTiming(car1LeftPos, { duration: 200 });
      }
    } else if (e.x > width / 2) {
      //   console.log("a");
      if (carPos2.value === "left") {
        carPos2.value = "right";
        carPos2x.value = withTiming(car2RightPos, { duration: 200 });
      } else {
        carPos2.value = "left";
        carPos2x.value = withTiming(car2LeftPos, { duration: 200 });
      }
    }
  });
  const obstacles = [
    {
      id: 0,
      x: useSharedValue(getRandomLeft()),
      y: useSharedValue(-100),
    },
    {
      id: 1,
      x: useSharedValue(getRandomLeft()),
      y: useSharedValue(-100),
    },
    {
      id: 2,
      x: useSharedValue(getRandomLeft()),
      y: useSharedValue(-100),
    },
    {
      id: 3,
      x: useSharedValue(getRandomLeft()),
      y: useSharedValue(-100),
    },
    {
      id: 4,
      x: useSharedValue(getRandomLeft()),
      y: useSharedValue(-100),
    },
  ];
  const obstaclesR = [
    {
      id: 0,
      x: useSharedValue(getRandomRight()),
      y: useSharedValue(-100),
    },
    {
      id: 1,
      x: useSharedValue(getRandomRight()),
      y: useSharedValue(-100),
    },
    {
      id: 2,
      x: useSharedValue(getRandomRight()),
      y: useSharedValue(-100),
    },
    {
      id: 3,
      x: useSharedValue(getRandomRight()),
      y: useSharedValue(-100),
    },
    {
      id: 4,
      x: useSharedValue(getRandomRight()),
      y: useSharedValue(-100),
    },
  ];
  //   obstacles[0].y.value = withSequence(
  //     withTiming(height, { duration: 5000, easing: Easing.linear }),
  //     withTiming(-100, { duration: 0, easing: Easing.linear })
  //   );

  useEffect(() => {
    let obj = 0;
    let intervalId: any;
    if (props.running === true) {
      intervalId = setInterval(() => {
        if (obj < obstacles.length) {
          moveObstacle(obj);
          obj++;
        } else {
          obj = 0;
          moveObstacle(obj);
          obj++;
        }
      }, 1500);

      return () => clearInterval(intervalId);
    } else {
      // Clear interval immediately if running becomes false
      clearInterval(intervalId);
    }
  }, [props.running]);
  //   let obj = 0;

  const moveObstacle = (obj: number) => {
    const generateLeft = () => {
      obstacles[obj].x.value = getRandomLeft();
      obstacles[obj].y.value = withSequence(
        withTiming(height, { duration: 5000, easing: Easing.linear }),
        withTiming(-100, { duration: 0, easing: Easing.linear })
      );
    };
    const generateRight = () => {
      obstaclesR[obj].x.value = getRandomRight();
      obstaclesR[obj].y.value = withSequence(
        withTiming(height, { duration: 5000, easing: Easing.linear }),
        withTiming(-100, { duration: 0, easing: Easing.linear })
      );
    };
    const doGenL = Math.random() < 0.9 ? "Generate" : "Nope";
    const doGenR = Math.random() < 0.9 ? "Generate" : "Nope";
    if (doGenL === "Generate") generateLeft();
    if (doGenR === "Generate") generateRight();
  };
  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        <Canvas style={styles.container}>
          {obstacles.map((obstacle) => {
            return (
              <Obstacle
                key={obstacle.id}
                id={obstacle.id}
                positionX={obstacle.x}
                positionY={obstacle.y}
              />
            );
          })}
          {obstaclesR.map((obstacle) => {
            return (
              <Obstacle
                key={obstacle.id}
                id={obstacle.id}
                positionX={obstacle.x}
                positionY={obstacle.y}
              />
            );
          })}

          <Car
            positionX={carPos1x}
            positionY={height - carHeight - 3 * MARGIN}
            color="green"
          />
          <Car
            positionX={carPos2x}
            positionY={height - carHeight - 3 * MARGIN}
            color="red"
          />
        </Canvas>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height,
  },
});

export default Game;
