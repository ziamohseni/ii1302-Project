import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import globalStyles from "../../styles/globalStyles";
import selectHubStyles from "../../styles/selectHubStyles";

function ConnectUserToHubWithQRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      {/* Title and button */}
      <TouchableOpacity
        style={[selectHubStyles.selectHubContainer, styles.addButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>CONNECT TO A HUB</Text>
        <View>
          <Ionicons
            name="person-add"
            size={22}
            color={globalStyles.primaryColor.color}
          />
        </View>
      </TouchableOpacity>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={selectHubStyles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={selectHubStyles.modalView}>
            <Text style={styles.modalInfoText}>
              Scan the QR code for the Hub you want to connect to.
            </Text>
            <View style={styles.container}>
              <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr", "pdf417"],
                }}
                style={styles.camera}
              />
              {scanned && (
                <Button
                  title={"Tap to Scan Again"}
                  onPress={() => setScanned(false)}
                />
              )}
            </View>
          </View>
          {/* Close button */}
          <Pressable
            style={selectHubStyles.selectHubCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons
              name="close-outline"
              size={36}
              color={globalStyles.darkColor.color}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalInfoText: {
    fontSize: 18,
    marginBottom: 20,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    height: 250,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  addButton: {
    backgroundColor: globalStyles.lightColor.color,
    borderWidth: 1,
    borderColor: globalStyles.primaryColor.color,
  },
  addButtonText: {
    color: globalStyles.primaryColor.color,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ConnectUserToHubWithQRCode;
