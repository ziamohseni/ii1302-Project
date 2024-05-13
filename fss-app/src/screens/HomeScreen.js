import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";
import SelectHub from "../components/global/SelectHub";
import NoHubsFound from "../components/global/NoHubsFound";
import AlarmTriggeredWarningBar from "../components/global/AlarmTriggeredWarningBar";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/homeScreenStyles";

function HomeScreen() {
  const { noHubsFound } = useRaspberryHubs();

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SelectHub />
          <ActivationButton />
        </View>
        {noHubsFound && <NoHubsFound />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
