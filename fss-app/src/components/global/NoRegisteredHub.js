import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import selectHubStyles from "../../styles/selectHubStyles";
import globalStyles from "../../styles/globalStyles";

function NoRegisteredHub(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.noHubsFound}>
      <View
        style={[
          selectHubStyles.centeredView,
          { backgroundColor: globalStyles.lightColor.color },
        ]}
      >
        <View style={selectHubStyles.modalView}>
          <Text style={selectHubStyles.selectText}>No Hubs Found!</Text>
          <Text>
            There are no hubs registered to your account. If you recently
            purchased a 5Sense Security hub, please refer to the package
            instructions to register your hub.
          </Text>
          <Text>
            If you are a family member, ask the hub owner to add you as a user.
          </Text>
        </View>
        {/* Sign out button */}
        <Pressable
          style={[
            selectHubStyles.selectHubCloseButton,
            { flexDirection: "row", alignItems: "center" },
          ]}
          onPress={() => signOut(auth)}
        >
          <Text>SIGN OUT </Text>
          <Ionicons
            name="exit-outline"
            size={16}
            color={globalStyles.darkColor}
          />
        </Pressable>
      </View>
    </Modal>
  );
}

export default NoRegisteredHub;
