import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
// Styles
import globalStyles from "../../styles/globalStyles";

// Screens
import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import DevicesScreen from "../../screens/DevicesScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Show loading spinner while checking if user is logged in
  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          color={globalStyles.primaryColor.color}
        />
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: globalStyles.primaryColor.color,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default TabNavigation;
