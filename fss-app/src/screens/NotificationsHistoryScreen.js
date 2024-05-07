import { ScrollView, Text, View } from "react-native";
import NoHubsFound from "../components/global/NoHubsFound";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";

function NotificationsHistoryScreen() {
  const { noHubsFound } = useRaspberryHubs();

  return (
    <ScrollView contentContainerStyle={globalStyles.containerWithPadding}>
      <View>
        <Text>Notifications History</Text>
      </View>
      {noHubsFound && <NoHubsFound />}
    </ScrollView>
  );
}

export default NotificationsHistoryScreen;
