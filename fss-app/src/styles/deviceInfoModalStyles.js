import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const deviceInfoModalStyles = StyleSheet.create({

  logo: {
    width: 31*2,
    height: 25*2,
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

});

export default deviceInfoModalStyles;
