import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const activationButtonStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingVertical: 30,
    marginTop: 30,
    backgroundColor: globalStyles.lightColor.color,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: globalStyles.secondLightColor.color,
  },
  buttonOff: {
    backgroundColor: "green",
    borderRadius: 50,
    marginVertical: 30,
  },
  buttonOn: {
    backgroundColor: "red",
    borderRadius: 50,
    marginVertical: 30,
  },
  alarmStatusText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  infoText: {
    bottom: 0,
    fontSize: 15,
    paddingHorizontal: 10,
    textAlign: "center",
  },
});

export default activationButtonStyles;
