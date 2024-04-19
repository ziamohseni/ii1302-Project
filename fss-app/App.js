import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

// Styles
import globalStyles from "./src/styles/globalStyles";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import DevicesScreen from "./src/screens/DevicesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: globalStyles.primaryColor.color,
          tabBarInactiveTintColor: globalStyles.darkColor.color,
          tabBarStyle: {
            backgroundColor: globalStyles.lightColor.color,
            borderTopColor: globalStyles.borderColor.borderColor,
            height: Platform.OS === "ios" ? 84 : 54,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="home" size={26} color={color} />
              ) : (
                <Ionicons name="home-outline" size={26} color={color} />
              ),
          }}
        />
        <Tab.Screen
          name="Devices"
          component={DevicesScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="cog" size={26} color={color} />
              ) : (
                <Ionicons name="cog-outline" size={26} color={color} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="person" size={26} color={color} />
              ) : (
                <Ionicons name="person-outline" size={26} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
