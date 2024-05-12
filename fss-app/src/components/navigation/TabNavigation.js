import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";
import ActivityIndicatorComponent from "../global/ActivityIndicatorComponent";
import AlarmTriggeredWarningBar from "../global/AlarmTriggeredWarningBar";
// Context
import { useUser } from "../../contexts/UserContext";
// Styles
import globalStyles from "../../styles/globalStyles";
// Screens
import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import DevicesScreen from "../../screens/DevicesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import NotificationsHistoryScreen from "../../screens/NotificationsHistoryScreen";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const { isLoading, isUserLoggedInAndVerified } = useUser();

  // Show loading spinner while checking if user is logged in
  if (isLoading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: globalStyles.darkColor.color,
          tabBarInactiveTintColor: globalStyles.darkColor.color,
          tabBarStyle: {
            backgroundColor: globalStyles.lightColor.color,
            borderTopColor: globalStyles.secondLightColor.color,
            height: Platform.OS === "ios" ? 84 : 54,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
          headerStyle: {
            backgroundColor: globalStyles.lightColor.color,
          },
        }}
      >
        {isUserLoggedInAndVerified ? (
          <>
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
              name="Notifications"
              component={NotificationsHistoryScreen}
              options={{
                tabBarIcon: ({ focused, color }) =>
                  focused ? (
                    <Ionicons name="notifications" size={26} color={color} />
                  ) : (
                    <Ionicons
                      name="notifications-outline"
                      size={26}
                      color={color}
                    />
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
          </>
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <Ionicons name="log-in" size={26} color={color} />
                ) : (
                  <Ionicons name="log-in-outline" size={26} color={color} />
                ),
              headerShown: false,
              tabBarStyle: { display: "none" },
            }}
          />
        )}
      </Tab.Navigator>
      {/* Red alarm bar */}
      <AlarmTriggeredWarningBar miniBar={true} />
    </>
  );
}

export default TabNavigation;
