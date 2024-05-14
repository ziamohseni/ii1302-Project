import { useState } from "react";
import { Text, TouchableOpacity, View, Modal, Image} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DeviceInfoModal from "./DevideInfoModal";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/devicesListStyles";
//logos
import cameraLogo from "../../../assets/photo-camera.png";
import doorLogo from "../../../assets/door.png";
import smokeLogo from "../../../assets/smoke.png";
import knockLogo from "../../../assets/hand.png";
import floodLogo from "../../../assets/flood.png";

function DevicesList() {
  const { selectedHub } = useRaspberryHubs();
  const sensorsArray = selectedHub && Object.values(selectedHub.sensors);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function getLogo(type) {
    switch (type) {
      case "camera":
        return <Image source={cameraLogo} style={styles.logo} />;
      case "door":
        return <Image source={doorLogo} style={styles.logo} />;
      case "smoke":
        return <Image source={smokeLogo} style={styles.logo} />;
      case "knock":
        return <Image source={knockLogo} style={styles.logo} />;
      case "flooding":
        return <Image source={floodLogo} style={styles.logo} />;
    }
  }

  function formatDate(timestamp){
    if (!timestamp) return "Never been triggered";
    let date = new Date(Math.floor(timestamp));
    return date.toLocaleString();
  }

  function formatText(string){
    if (typeof string === 'boolean') {
      string = string.toString();
    }
    if(typeof string !== 'string'){
      return "Not a String";
    }
    string = string.toLowerCase();
    const formattedText = string.charAt(0).toUpperCase() + string.substring(1, string.length);
    return formattedText;
  }

  function handleSensorPress(item) {
    setModalVisible(true);
    setSelectedItem(item);
  }

  function supressDeviceInfo() {
    setModalVisible(false);
  }

  let renderSensors = sensorsArray?.map((item) => (

    <TouchableOpacity
      key={item.id}
      style={[styles.devices, globalStyles.shadow]}
      onPress={() => handleSensorPress(item)}
    >
      <View style={styles.deviceContainer}>
        {getLogo(item.type.toLowerCase())}
        <View style={styles.deviceTextContainer}>
          <Text style={styles.deviceText}>
            Sensor: {formatText(item.type)}
          </Text>
          <Text style={styles.deviceText}>Status: {formatText(item.status)}</Text>
        </View>
      </View>

      <View
        key={item.id}
        style={item.triggered ? styles.devicesLowerTriggered : styles.devicesLower}
        onPress={() => handleSensorPress(item)}>

        {item.triggered ?
        <View style = {{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.trigText}>DEVICE IS TRIGGERED  </Text>
          <Ionicons
            name="warning"
            size={26}
            color={"white"}
          />
        </View>
        :
        <Text style={styles.lastTrigText}> Last triggered: 
          {item.last_triggered? formatDate(item.last_triggered) : " Never been triggered!"} 
        </Text>
        }
        
      </View>
    </TouchableOpacity>
    
  ));

  return (
    
    <View>
      <Text style={[styles.deviceText, {fontSize: 20}]}>
        List of devices in hub #{selectedHub && selectedHub.id}
      </Text>

      <View style={styles.container}>
        {renderSensors}
      </View>

      {modalVisible && (
        <DeviceInfoModal
          formatDate = {formatDate}
          item={selectedItem}
          isModalVisable={modalVisible}
          closeModal={supressDeviceInfo}
          formatText = {formatText}
        />
      )}
    
    </View>

  );
}

export default DevicesList;
