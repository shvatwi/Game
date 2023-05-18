import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const getRandom = (left) => {
  const array = [Math.floor(width / 8), Math.floor((3 * width) / 8)];
  return array[Math.floor(Math.random() * array.length)];
};

export const getobstpos = () => {
  let xpos = getRandom(width);

  return xpos;
};
