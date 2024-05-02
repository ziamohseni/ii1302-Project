import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const devicesScreenStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    paddingVertical: 10,
  },

  devices: {
    backgroundColor: globalStyles.primaryColor.color,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
    textAlign: "center",
  },

});

export default devicesScreenStyles;
