import { Text, TouchableOpacity, View } from "react-native";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/devicesListStyles";

function DevicesList() {
  const { selectedHub } = useRaspberryHubs();
  const sensorsArray = Object.values(selectedHub.sensors);

  function formatDate(timestamp){
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  console.log(sensorsArray)

  let renderSensors = sensorsArray.map(item =>
    <TouchableOpacity key={item.id} style = {styles.devices}>
      <Text style = {styles.deviceText}>Type: {item.type}, Status: {item.status} </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={globalStyles.text}>
        List of devices in hub # {selectedHub.id}
      </Text>

      <View style = {styles.container}>
        {renderSensors}
      </View>

      <Text>{/*formatDate(sensorsArray[0].last_active)*/}</Text>
    </View>
  );
}

export default DevicesList;
