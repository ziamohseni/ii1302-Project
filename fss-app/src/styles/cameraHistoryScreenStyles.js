import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const devicesScreenStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: globalStyles.lightColor.color,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    marginTop: Platform.OS === "ios" ? 10 : 40,
  },
  selectHubContainer: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default devicesScreenStyles;
