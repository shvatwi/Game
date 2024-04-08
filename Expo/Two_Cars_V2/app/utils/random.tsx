import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const getRandomLeft = () => {
  const array = [Math.floor(width / 8), Math.floor((3 * width) / 8)];
  return array[Math.floor(Math.random() * array.length)];
};
export const getRandomRight = () => {
  const array = [Math.floor((5 * width) / 8), Math.floor((7 * width) / 8)];
  return array[Math.floor(Math.random() * array.length)];
};

export const getobstpos = (position: string) => {
  var xpos;
  if (position === "right") {
    xpos = getRandomRight();
  } else {
    xpos = getRandomLeft();
  }
  return xpos;
};
