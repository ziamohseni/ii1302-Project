import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import selectHubStyles from "../../styles/selectHubStyles";
import globalStyles from "../../styles/globalStyles";

function SelectHub() {
  const { selectedHub, hubs, selectHub } = useRaspberryHubs();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[selectHubStyles.selectHubContainer, globalStyles.shadow]}
        onPress={() => setModalVisible(true)}
      >
        <Text>
          SELECTED HUB: {selectedHub?.id} - ({selectedHub?.role})
        </Text>
        <Text>
          <Ionicons
            name="arrow-forward-outline"
            size={18}
            color={globalStyles.darkColor.color}
          />
        </Text>
      </TouchableOpacity>

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
            <Text style={selectHubStyles.selectText}>Please select a hub:</Text>
            {hubs.map((hub) => (
              <TouchableOpacity
                key={hub.id}
                onPress={() => {
                  setModalVisible(false);
                  selectHub(hub.id);
                }}
                style={selectHubStyles.selectHubItem}
              >
                <Text>{hub.id}</Text>
              </TouchableOpacity>
            ))}
            <Text>
              You currently have {hubs.length} connected hub(s) to your account.
            </Text>
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
}

export default SelectHub;
