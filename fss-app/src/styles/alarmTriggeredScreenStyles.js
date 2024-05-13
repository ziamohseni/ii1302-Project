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
  title: {
    fontSize: 26,
    color: globalStyles.lightColor.color,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: globalStyles.lightColor.color,
    textAlign: "left",
  },
  triggeredHubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: globalStyles.lightColor.color,
    borderRadius: 10,
    ...globalStyles.shadow,
  },
  triggeredHubInfo: {
    fontSize: 16,
    color: globalStyles.darkColor.color,
  },
});

export default alarmTriggeredScreenStyles;
