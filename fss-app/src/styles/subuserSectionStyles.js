import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const subuserSectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: globalStyles.lightColor.color,
  },
});

export default subuserSectionStyles;
