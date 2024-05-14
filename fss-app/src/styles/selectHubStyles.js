import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const selectHubStyles = StyleSheet.create({
  selectHubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: globalStyles.lightColor.color,
    padding: 20,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: globalStyles.lightColor.color,
    borderRadius: 20,
    padding: 20,
    shadowColor: globalStyles.darkColor.color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectHubItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: globalStyles.lightColor.color,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: globalStyles.darkColor.color,
    borderWidth: 1,
  },
  selectText: {
    fontSize: 20,
    color: globalStyles.darkColor.color,
    marginBottom: 10,
  },
  selectHubCloseButton: {
    backgroundColor: globalStyles.lightColor.color,
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
});

export default selectHubStyles;
