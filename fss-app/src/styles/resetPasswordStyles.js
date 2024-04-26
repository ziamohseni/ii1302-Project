import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 40, 
    alignContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 60,
  },
  infoText: {
    fontSize: 15,
    color: globalStyles.darkColor.color,
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textInactive: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  backButtonContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  backButtonIcon: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: globalStyles.primaryColor.color,
  },
  backButton: {
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
    color: globalStyles.primaryColor.color
  }
});

export default resetPasswordStyles;