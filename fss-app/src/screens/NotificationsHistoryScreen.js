import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import NoHubsFound from "../components/global/NoHubsFound";
import Ionicons from "@expo/vector-icons/Ionicons";
import convertUnixTimestampToDate from "../utils/convertUnixTimestampToDate";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
import { useNotifications } from "../contexts/NotificationsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/notificationsHistoryScreenStyles";

function NotificationsHistoryScreen() {
  const { noHubsFound } = useRaspberryHubs();
  const { getNotificationsFromStorage } = useNotifications();
  const [notifications, setNotifications] = useState([]);

  // Get notifications from async-storage
  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotificationsFromStorage();
      if (notifications) {
        const sortedNotifications = notifications.sort(
          (a, b) => b.date - a.date
        );
        setNotifications(sortedNotifications);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
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
                // Notification data
                const notificationData = notification.request.content;
                // Notification type
                const notificationType =
                  notificationData.categoryIdentifier.toLowerCase();
                // Notification container style
                const notificationContainerStyle =
                  styles[`${notificationType}NotificationContainer`];
                // Format date
                const date = convertUnixTimestampToDate(notification.date);

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
                            : "information-circle"
                        }
                        size={26}
                        color={globalStyles.darkColor.color}
                      />
                    </View>
                    {/* Notification */}
                    <View>
                      <Text style={styles.notificationTitle}>
                        {notificationData.title}
                      </Text>
                      <Text style={styles.notificationBody}>
                        {notificationData.body}
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
