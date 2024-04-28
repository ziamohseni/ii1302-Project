import { StyleSheet } from "react-native";

const activationButtonStyles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingVertical: 30,
  },
  buttonOff: {
    backgroundColor: "green",
    borderRadius: 50,
  },
  buttonOn: {
    backgroundColor: "red",
    borderRadius: 50,
  },
  alarmStatusText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  infoText: {
    marginTop: 30,
    bottom: 0,
    fontSize: 15,
  },
});

export default activationButtonStyles;
