import { useState } from "react";
import { Text, TouchableOpacity, View, Modal, Image } from "react-native";
import DeviceInfoModal from "./DevideInfoModal";
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
    }
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
        {getLogo(item.type)}
        <Text style={styles.deviceText}>
          Sensor: {item.type}, Status: {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <View>
      <Text style={styles.deviceText}>
        List of devices in hub # {selectedHub && selectedHub.id}
      </Text>

      <View style={styles.container}>{renderSensors}</View>

      {modalVisible && (
        <DeviceInfoModal
          item={selectedItem}
          isModalVisable={modalVisible}
          closeModal={supressDeviceInfo}
        />
      )}
    </View>
  );
}

export default DevicesList;
