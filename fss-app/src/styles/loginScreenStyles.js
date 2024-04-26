import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";
import signUpStyles from "./signUpStyles";

const loginScreenStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: globalStyles.lightColor.color,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: globalStyles.darkColor.color,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textDark: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: globalStyles.darkColor.color,
  },
  forgotPassButton: {
    marginTop: 10,
  },
  forgotPassText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "right",
    color: globalStyles.primaryColor.color,
  },
  signUpButton: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: globalStyles.primaryColor.color
  },
});

export default loginScreenStyles;
