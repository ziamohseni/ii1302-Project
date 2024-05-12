import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const AlarmTriggeredWarningBarStyles = StyleSheet.create({
  alarmContainer: {
    backgroundColor: globalStyles.errorColor.color,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alarmMiniBarContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 84 : 54,
    left: 0,
    right: 0,
  },
  alarmBarContainer: {
    position: "relative",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  flashyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: globalStyles.warningColor.color,
    padding: 10,
    borderRadius: 10,
  },
});

export default AlarmTriggeredWarningBarStyles;
