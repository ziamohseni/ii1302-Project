import { ScrollView, Text, View, SafeAreaView } from "react-native";
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
    <SafeAreaView style={globalStyles.containerWithoutPadding}>  
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
          <View style={styles.container}>
            <SelectHub />
            <DevicesList />
          </View>
      
        {noHubsFound && <NoHubsFound />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DevicesScreen;
