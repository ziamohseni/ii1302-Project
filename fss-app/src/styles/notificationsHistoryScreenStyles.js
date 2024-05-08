import { StyleSheet } from "react-native";
import globalStyles from "./globalStyles";

const NotificationsHistoryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.darkColor.color,
  },
  notificationsContainer: {
    flex: 1,
    gap: 10,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: globalStyles.lightColor.color,
    borderColor: globalStyles.secondLightColor.color,
    borderWidth: 2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  alarmNotificationContainer: {
    borderColor: globalStyles.warningColor.color,
    backgroundColor: globalStyles.warningColorLight.color,
  },
  infoNotificationContainer: {
    borderColor: globalStyles.infoColor.color,
    backgroundColor: globalStyles.infoColorLight.color,
  },
  successNotificationContainer: {
    borderColor: globalStyles.successColor.color,
    backgroundColor: globalStyles.successColorLight.color,
  },
  notificationTitle: {
    fontWeight: "bold",
  },
  notificationBody: {
    color: globalStyles.darkColor.color,
    marginRight: 10,
  },
  notificationCategory: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  notificationCategoryTextContainer: {
    color: globalStyles.lightColor.color,
    backgroundColor: globalStyles.darkColor.color,
    padding: 5,
    borderRadius: 5,
  },
  notificationCategoryText: {
    color: globalStyles.lightColor.color,
  },
  noNotificationFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationsHistoryScreenStyles;
