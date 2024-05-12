import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";
//platform
import { Platform } from "react-native";

const alarmTriggeredScreenStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: globalStyles.dangerColor.color,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    marginTop: Platform.OS === "ios" ? 10 : 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default alarmTriggeredScreenStyles;
