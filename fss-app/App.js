import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
// Contexts
import { UserProvider } from "./src/contexts/UserContext";
import { RaspberryHubsProvider } from "./src/contexts/RaspberryHubsContext";
import { NotificationsProvider } from "./src/contexts/NotificationsContext";

// Navigation
import RootNavigation from "./src/components/navigation/RootNavigation";

export default function App() {
  return (
    <NotificationsProvider>
      <UserProvider>
        <RaspberryHubsProvider>
          <NavigationContainer>
            <RootNavigation />
            <StatusBar style="dark" />
          </NavigationContainer>
        </RaspberryHubsProvider>
      </UserProvider>
    </NotificationsProvider>
  );
}
