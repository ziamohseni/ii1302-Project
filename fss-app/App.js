import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
// Contexts
import { UserProvider } from "./src/contexts/UserContext";
import { RaspberryHubsProvider } from "./src/contexts/RaspberryHubsContext";
import { NotificationsProvider } from "./src/contexts/NotificationsContext";

// Navigation
import TabNavigation from "./src/components/navigation/TabNavigation";

export default function App() {
  return (
    <UserProvider>
      <NotificationsProvider>
        <RaspberryHubsProvider>
          <NavigationContainer>
            <TabNavigation />
            <StatusBar style="dark" />
          </NavigationContainer>
        </RaspberryHubsProvider>
      </NotificationsProvider>
    </UserProvider>
  );
}
