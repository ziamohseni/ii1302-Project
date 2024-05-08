import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import NoHubsFound from "../components/global/NoHubsFound";
import Ionicons from "@expo/vector-icons/Ionicons";
import convertUnixTimestampToDate from "../utils/convertUnixTimestampToDate";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/notificationsHistoryScreenStyles";
import SelectHub from "../components/global/SelectHub";

function NotificationsHistoryScreen() {
  const { selectedHub, noHubsFound } = useRaspberryHubs();
  const [notifications, setNotifications] = useState([]);

  // Get notifications from async-storage
  useEffect(() => {
    const notificationsArray = selectedHub && selectedHub.notification_history;
    if (notificationsArray) {
      const sortedNotifications = notificationsArray.sort(
        (a, b) => b.time - a.time
      );
      setNotifications(sortedNotifications);
    }

    return () => {
      setNotifications([]);
    };
  }, [selectedHub]);

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SelectHub />
          <Text style={styles.title}>Notifications History</Text>
          {/* No Notification Found */}
          {!notifications.length && (
            <View style={styles.noNotificationFound}>
              <Text>No notifications found</Text>
            </View>
          )}
          {/* Notifications */}
          <View style={styles.notificationsContainer}>
            {notifications &&
              notifications.map((notification, index) => {
                // Notification type
                const notificationType = notification.categoryId.toLowerCase();
                // Notification container style
                const notificationContainerStyle =
                  styles[`${notificationType}NotificationContainer`];
                // Format date
                const date = convertUnixTimestampToDate(notification.time);

                return (
                  <View
                    key={index}
                    style={[styles.notification, notificationContainerStyle]}
                  >
                    {/* Icon */}
                    <View>
                      <Ionicons
                        name={
                          notificationType === "alarm"
                            ? "warning"
                            : notificationType === "camera"
                            ? "camera"
                            : "information-circle"
                        }
                        size={26}
                        color={globalStyles.darkColor.color}
                      />
                    </View>
                    {/* Notification */}
                    <View>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationBody}>
                        {notification.body}
                      </Text>
                      <Text>{date}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
        {noHubsFound && <NoHubsFound />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NotificationsHistoryScreen;
