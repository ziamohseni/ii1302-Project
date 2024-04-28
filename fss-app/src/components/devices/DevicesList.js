import { Text, View } from "react-native";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/devicesListStyles";

function DevicesList() {
  const { selectedHub } = useRaspberryHubs();
  const sensorsArray = Object.values(selectedHub.sensors);

  // console.log(sensorsArray);

  return (
    <View>
      <Text style={globalStyles.text}>
        List of devices in hub # {selectedHub.id}
      </Text>
      <Text>Sensors are NOT array. Fixing sensor list later.</Text>
    </View>
  );
}

export default DevicesList;
