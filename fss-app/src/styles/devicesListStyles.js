import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const devicesScreenStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    paddingVertical: 10,
  },

  devices: {
    backgroundColor: globalStyles.lightColor.color,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
  },

  deviceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
    textAlign: "center",
  },

  logo: {
    width: 31,
    height: 25,
  },

});

export default devicesScreenStyles;
