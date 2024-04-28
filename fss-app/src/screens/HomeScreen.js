import { ScrollView, Text, View } from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";
import SelectHub from "../components/global/SelectHub";
// Styles
import globalStyles from "../styles/globalStyles";

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={globalStyles.containerWithPadding}>
      <View>
        <SelectHub />
        <ActivationButton />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
