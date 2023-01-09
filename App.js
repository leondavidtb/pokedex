import { StyleSheet, Text, View, StatusBar } from "react-native";
import { textColor } from "./src/assets/colors";

export default function App() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />
      <View style={{ flex: 1, backgroundColor: textColor.white }}>
        <Text>Hello</Text>
      </View>
    </>
  );
}
