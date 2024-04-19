import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";
// Styles
import globalStyles from "../../styles/globalStyles";

// Screens
import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import DevicesScreen from "../../screens/DevicesScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const isLoggedIn = false;

function TabNavigation() {
  return (
    <>
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
        {isLoggedIn ? (
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
    </>
  );
}

export default TabNavigation;
