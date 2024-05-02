import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const noHubsFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  textContainer: {
    backgroundColor: globalStyles.lightColor.color,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
  },
});

export default noHubsFoundStyles;
