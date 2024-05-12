import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
// Navigations
import TabNavigation from "./TabNavigation";
import AlarmTriggeredScreen from "../../screens/AlarmTriggeredScreen";
// Styles
import globalStyles from "../../styles/globalStyles";

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Group>
        <RootStack.Screen name="TabNavigation" component={TabNavigation} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "card" }}>
        <RootStack.Screen
          name="AlarmTriggeredModal"
          component={AlarmTriggeredScreen}
          options={{
            animation: "slide_from_bottom",
            gestureDirection: "vertical",
            gestureEnabled: true,
            contentStyle: {
              backgroundColor: globalStyles.dangerColor.color,
              borderTopRightRadius: Platform.OS === "ios" ? 20 : 0,
              borderTopLeftRadius: Platform.OS === "ios" ? 20 : 0,
              overflow: "hidden",
            },
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
