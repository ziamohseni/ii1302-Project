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
  input: {  
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
    color: globalStyles.darkColor.color,
    height: 65,
    borderColor: globalStyles.secondLightColor.color,
    borderRadius: 15,
    marginVertical: 20,
    padding: 10,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 25,
  },
  button: {
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingVertical: 30,
  },
  backButtonIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyles.darkColor.color,
  },
  backButton: {
    backgroundColor: globalStyles.darkColor.color,
    borderRadius: 15,
    backgroundColor: globalStyles.secondLightColor.color,
    height: 50,
    width: 50,
  }
});

export default resetPasswordStyles;