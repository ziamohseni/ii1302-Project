import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  primaryColor: {
    color: "#1E90FF",
  },
  lightColor: {
    color: "#f9f9f9",
  },
  secondLightColor: {
    color: "#dddddd",
  },
  darkColor: {
    color: "#111111",
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
  errorText: {
    color: "red",
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default globalStyles;
