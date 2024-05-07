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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
    textAlign: "left",
    paddingLeft: 15,
  },

  deviceTextContainer: {
    flexDirection: 'column', 
    paddingRight: 40,
   
  },

  logo: {
    width: 30,
    height: 30,
  },

});

export default devicesScreenStyles;
