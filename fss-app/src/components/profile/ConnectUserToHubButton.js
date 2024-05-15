import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConnectUserToHubWithQRCodeModal from "./ConnectUserToHubWithQRCodeModal";
// Styles
import globalStyles from "../../styles/globalStyles";
import selectHubStyles from "../../styles/selectHubStyles";

function ConnectUserToHubButton() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[selectHubStyles.selectHubContainer, styles.addButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>CONNECT TO A HUB</Text>
        <View>
          <Ionicons
            name="qr-code-outline"
            size={22}
            color={globalStyles.primaryColor.color}
          />
        </View>
      </TouchableOpacity>
      {/* Modal */}
      <ConnectUserToHubWithQRCodeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

export default ConnectUserToHubButton;
