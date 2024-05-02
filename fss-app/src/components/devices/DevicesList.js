import { Text, TouchableOpacity, View, Image} from "react-native";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/devicesListStyles";
//logos
import cameraLogo from "../../../assets/camera.png";
import doorLogo from "../../../assets/door.png";
import smokeLogo from "../../../assets/smoke.png";
import knockLogo from "../../../assets/hand.png";


function DevicesList() {
  const { selectedHub } = useRaspberryHubs();
  const sensorsArray = Object.values(selectedHub.sensors);

  function formatDate(timestamp){
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  function getLogo(type){
    switch(type){
      case "camera":
        return <Image source={cameraLogo} style={styles.logo} />;
      case "door":
        return <Image source={doorLogo} style={styles.logo} />;
      case "smoke":
        return <Image source={smokeLogo} style={styles.logo} />;
      case "knock":
        return <Image source={knockLogo} style={styles.logo} />;
    }
  }

  let renderSensors = sensorsArray.map(item =>
    <TouchableOpacity key={item.id} style = {[styles.devices, globalStyles.shadow]}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30,}}>
      
      {getLogo(item.type)}
      <Text style={styles.deviceText}>
        Type: {item.type}, Status: {item.status}
      </Text>

      </View>
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
