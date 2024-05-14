import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

//platform
import { Platform } from "react-native";

const cameraSnapshotHistoryStyles = StyleSheet.create({
  snapshotItemContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  snapshotItem: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: globalStyles.secondLightColor.color,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});

export default cameraSnapshotHistoryStyles;
