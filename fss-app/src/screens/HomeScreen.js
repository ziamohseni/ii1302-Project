import { ScrollView, Text, View } from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";
import SelectHub from "../components/global/SelectHub";
import NoHubsFound from "../components/global/NoHubsFound";
import AlarmTriggeredWarningBar from "../components/global/AlarmTriggeredWarningBar";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";

function HomeScreen() {
  const { noHubsFound } = useRaspberryHubs();

  return (
    <ScrollView contentContainerStyle={globalStyles.containerWithPadding}>
      <View>
        <SelectHub />
        <AlarmTriggeredWarningBar />
        <ActivationButton />
      </View>
      {noHubsFound && <NoHubsFound />}
    </ScrollView>
  );
}

export default HomeScreen;
