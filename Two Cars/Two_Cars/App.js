import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import entities from "./entities";
import { Dimensions } from "react-native";
import Game from "./Game";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine1, setGameEngine1] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" hidden={true} />
      <Text
        style={{
          position: "absolute",
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        {currentPoints}
      </Text>

      <View style={styles.container}>
        <View style={styles.area1}>
          <Game
            running={running}
            setRunning={setRunning}
            gameEngine={gameEngine1}
            setGameEngine={setGameEngine1}
            currentPoints={currentPoints}
            setCurrentPoints={setCurrentPoints}
          />
        </View>
      </View>

      {!running && (
        <View style={styles.startButtonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine1.swap(entities());
            }}
          >
            <Text style={styles.startButtonText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  area1: {
    flex: 1,
    backgroundColor: "grey",
    opacity: 0.5,
  },
  startButtonContainer: {
    position: "absolute",
    bottom: 300,
    alignSelf: "center",
  },
  startButton: {
    backgroundColor: "black",
    padding: 15,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
});
