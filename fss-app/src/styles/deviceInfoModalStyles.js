import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const deviceInfoModalStyles = StyleSheet.create({

  logo: {
    width: 30*2,
    height: 30*2,
  },

  deviceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  title: {
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  text:{
    fontSize: 16,
    lineHeight: 25,
  },
  
  bold:{
    fontWeight: "bold",
  },

  buttonOff: {
    backgroundColor: "green",
    borderRadius: 20,
  },
  buttonOn: {
    backgroundColor: "red",
    borderRadius: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    padding: 10,
    marginTop: 30,
    backgroundColor: globalStyles.lightColor.color,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: globalStyles.secondLightColor.color,
  },
  activationText:{
    fontSize:20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  infoText:{
    paddingTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

});

export default deviceInfoModalStyles;
