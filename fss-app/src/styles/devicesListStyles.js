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
    
    marginHorizontal: 10,
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
    paddingLeft: 15,
  },

  deviceTextContainer: {
    flexDirection: 'column', 
    paddingRight: 40,
  },

  lastTrigText:{
    paddingLeft: 15,
    fontWeight: "500",
  },

  logo: {
    width: 30,
    height: 30,
  },

});

export default devicesScreenStyles;
