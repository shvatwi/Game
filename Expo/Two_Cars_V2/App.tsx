import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Game from "./app/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine1, setGameEngine1] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
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
            {/* gameEngine={gameEngine1}
             setGameEngine={setGameEngine1}
            currentPoints={currentPoints}
             setCurrentPoints={setCurrentPoints} */}
            <Game running={running} setRunning={setRunning} />
            {/* <Game running={running} setRunning={setRunning} /> */}
          </View>
        </View>
        {!running && (
          <View style={styles.startButtonContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                setCurrentPoints(0);
                setRunning(true);
                // gameEngine1.swap(entities());
              }}
            >
              <Text style={styles.startButtonText}>START GAME</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
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
    flexDirection: "row",
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
