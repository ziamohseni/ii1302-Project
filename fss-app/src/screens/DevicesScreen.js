import { ScrollView, Text, View } from "react-native";
import NoHubsFound from "../components/global/NoHubsFound";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Components
import DevicesList from "../components/devices/DevicesList";
import SelectHub from "../components/global/SelectHub";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/devicesScreenStyles";

function DevicesScreen() {
  const { noHubsFound } = useRaspberryHubs();

  return (
    <ScrollView contentContainerStyle={globalStyles.containerWithPadding}>
      <View>
        <View style={styles.container}>
          <SelectHub />
          <DevicesList />
        </View>
      </View>
      {noHubsFound && <NoHubsFound />}
    </ScrollView>
  );
}

export default DevicesScreen;
