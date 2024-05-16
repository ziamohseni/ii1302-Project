import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const listSubusersForSelectedHubStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  subUserContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: globalStyles.secondLightColor.color,
    borderRadius: 10,
  },
  subUserInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default listSubusersForSelectedHubStyles;
