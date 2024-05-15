import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { ref, update } from "firebase/database";
import { database } from "../../services/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScannerCamera from "../global/ScannerCamera";
// Contexts
import { useUser } from "../../contexts/UserContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import selectHubStyles from "../../styles/selectHubStyles";

function ConnectUserToHubWithQRCodeModal({ modalVisible, setModalVisible }) {
  const { user, profile, fetchUserProfile } = useUser();

  // TODO: Check the hubId against the hubs in the database to ensure it is a valid hub
  // Function to add hub to user's profile under hubs_accessible array
  const addHubToUser = async (hubId) => {
    if (
      profile?.hubs_accessible?.includes(hubId) ||
      profile?.hubs_owned?.includes(hubId)
    ) {
      alert("You are already connected to this hub.");
      return;
    } else {
      const userRef = ref(database, "users/" + user.uid);
      const updates = {
        hubs_accessible: profile.hubs_accessible
          ? [...profile.hubs_accessible, hubId]
          : [hubId],
      };
      await update(userRef, updates);
      setModalVisible(false);
      fetchUserProfile(user);
      alert("Hub connected successfully!");
    }
  };

  return (
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
          <ScannerCamera addHubToUser={addHubToUser} />
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
  );
}

const styles = StyleSheet.create({
  modalInfoText: {
    fontSize: 18,
    marginBottom: 20,
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

export default ConnectUserToHubWithQRCodeModal;
