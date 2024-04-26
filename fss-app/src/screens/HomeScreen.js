import { Text, View } from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     
      <ActivationButton />
    </View>
  );
}

export default HomeScreen;
