import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/contexts/UserContext";

// Navigation
import TabNavigation from "./src/components/navigation/TabNavigation";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <TabNavigation />
        <StatusBar style="dark" />
      </NavigationContainer>
    </UserProvider>
  );
}
