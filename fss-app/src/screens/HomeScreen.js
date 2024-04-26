import { Text, View } from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <ActivationButton />
    </View>
  );
}

export default HomeScreen;
