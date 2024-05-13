import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 50,
  },
  imageContainer:{
    paddingRight: 20,
  },
  lastArmedContainer:{
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: globalStyles.secondLightColor.color,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    paddingRight: 20,
  },
  lastArmedText:{
    textAlign: "left",
    fontSize: 16,
  },
  timeText:{
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default homeScreenStyles;
