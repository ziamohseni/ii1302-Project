import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const profileInfoStyles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.lightColor.color,
    paddingTop: 15, 
    borderRadius: 15,
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
  },
  infoTitle:{
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  infoContainer:{
    paddingHorizontal: 15,
    paddingVertical: 0,
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
  signOutContainer:{
    backgroundColor: globalStyles.lightColor.color,
    padding: 15,
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
    borderBottomEndRadius: 13,
    borderBottomLeftRadius: 13,
    marginTop: 20,
  },
  signOutText:{
    fontSize: 18,
    textAlign: "left",
    marginLeft: 20,
  },
  imageContainer:{
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  image:{
    borderWidth: 2,
    borderColor: globalStyles.secondLightColor.color,
    //borderRadius: 15,
    padding: 10,
    width: 90,
    height: 90
  }

});

export default profileInfoStyles;