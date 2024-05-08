import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const profileInfoStyles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.lightColor.color,
    padding: 15,
    borderRadius: 15,
  },
  infoTitle:{
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  infoText:{
    fontWeight: "normal",
  },
  hubs:{
    flexDirection: "row",
  }

});

export default profileInfoStyles;