import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

// Navigation
import TabNavigation from "./src/components/navigation/TabNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
