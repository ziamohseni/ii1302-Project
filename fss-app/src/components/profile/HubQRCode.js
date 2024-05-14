import { useState } from "react";
import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import globalStyles from "../../styles/globalStyles";
import selectHubStyles from "../../styles/selectHubStyles";

const HubQRCode = () => {
  const { selectedHub } = useRaspberryHubs();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Title and button */}
      <View
        style={[
          selectHubStyles.selectHubContainer,
          {
            padding: 0,
            paddingHorizontal: 10,
            marginTop: 20,
          },
        ]}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sub users</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="person-add"
            size={22}
            color={globalStyles.darkColor.color}
          />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={selectHubStyles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={selectHubStyles.modalView}>
            <Text style={selectHubStyles.selectText}>
              Sub user can scan the QR code below to get access to hub #:{" "}
              {selectedHub.id}
            </Text>
            <View style={{ alignSelf: "center" }}>
              <QRCode
                value={selectedHub.id}
                size={200}
                logo={require("../../../assets/fss-logo.png")}
                logoBackgroundColor={globalStyles.lightColor.color}
              />
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
        </View>
      </Modal>
    </View>
  );
};

export default HubQRCode;
