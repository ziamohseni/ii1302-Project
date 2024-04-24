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
});

export default globalStyles;
