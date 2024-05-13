import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const profileInfoStyles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.lightColor.color,
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  infoTitle:{
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  infoContainer:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText:{
    fontWeight: "normal",
  },
  infoTextHub:{
    textAlign: "right",

  },

});

export default profileInfoStyles;