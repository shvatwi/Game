import { Rect } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { SharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

interface CarProp {
  positionX: SharedValue<number>;
  positionY: number;
  color: string;
}

const Car = ({ positionX, positionY, color }: CarProp) => {
  const carHeight = width / 4;
  const carwidth = width / 4 - width / 16;

  return (
    <Rect
      x={positionX}
      y={positionY}
      width={carwidth}
      height={carHeight}
      color={color}
    />
  );
};

export default Car;
