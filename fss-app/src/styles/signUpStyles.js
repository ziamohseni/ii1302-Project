import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const signUpStyles = StyleSheet.create({
  welcomeContainer: {
    marginBottom: 30,
  },
  createAccount: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: globalStyles.darkColor.color,
  },
  loginButton: {
    marginTop: 10,
  },
});

export default signUpStyles;
