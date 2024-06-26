import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const devicesScreenStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    paddingVertical: 10, 
  },

  devices: {
    flexDirection: "column",
    gap: 5,
    backgroundColor: globalStyles.lightColor.color,
    marginTop: 10,
    borderRadius: 10,
  },

  devicesLower:{
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
    backgroundColor: "transparent",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
  },

  devicesLowerTriggered:{
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
    backgroundColor: globalStyles.dangerColor.color,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
  },

  deviceContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  deviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
    textAlign: "left",
    paddingLeft: 20,
  },

  listText: {
    fontSize: 16,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
    textAlign: "left",
    paddingLeft: 5,
  },

  deviceTextContainer: {
    flexDirection: 'column', 
    paddingRight: 40,
  },

  lastTrigText:{
    paddingLeft: 15,
    fontWeight: "500",
    padding: 1,
  },

  trigText:{
    textAlign: "center",
    fontWeight: "500",
    padding: 1,
    color: "white",
  },

  logo: {
    width: 35,
    height: 35,
  },

});

export default devicesScreenStyles;
