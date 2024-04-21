import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

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
  input: {
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
    color: globalStyles.darkColor.color,
    height: 65,
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 25,
  },
  buttonActive: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: globalStyles.primaryColor.color,
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: globalStyles.secondLightColor.color,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default loginScreenStyles;
