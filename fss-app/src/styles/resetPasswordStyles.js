import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  input: {  
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
    color: globalStyles.darkColor.color,
    height: 65,
    borderColor: globalStyles.darkColor.color,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 20,
    padding: 10,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 3.5,
    elevation: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: globalStyles.primaryColor.color,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  backButtonContainer: {
    bottom: 40,
  },
  backButtonIcon: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: globalStyles.darkColor.color,
  },
  backButton: {
    backgroundColor: globalStyles.secondLightColor.color,
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  }
});

export default resetPasswordStyles;