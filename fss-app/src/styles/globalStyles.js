import { StyleSheet } from "react-native";

// Colors
const primaryColor = "#1E90FF";
const lightColor = "#f9f9f9";
const secondLightColor = "#dddddd";
const darkColor = "#111111";

// Global styles
const globalStyles = StyleSheet.create({
  primaryColor: {
    color: primaryColor,
  },
  lightColor: {
    color: lightColor,
  },
  secondLightColor: {
    color: secondLightColor,
  },
  darkColor: {
    color: darkColor,
  },
  containerWithPadding: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  containerWithoutPadding: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  verticalPadding: {
    paddingVertical: 30,
  },
  inputStyle: {
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    color: darkColor,
    height: 65,
    borderColor: darkColor,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    padding: 10,
  },
  buttonActive: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: primaryColor,
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: secondLightColor,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default globalStyles;
