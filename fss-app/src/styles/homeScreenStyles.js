import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 50,
  },
});

export default homeScreenStyles;
