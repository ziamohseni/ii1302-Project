import { TouchableOpacity } from "react-native";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import { database } from "../../services/firebaseConfig";
import { ref, get, update } from "firebase/database";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/listSubusersForSelectedHubStyles";

const RemoveSubuserFromSelectedHub = ({ user }) => {
  const { selectedHub } = useRaspberryHubs();

  // Remove the user from the selected hub
  const removeUserFromHub = async (userId) => {
    if (!selectedHub) return;

    try {
      // Remove the user ID from the hub's users array
      const updatedHubUsers = selectedHub.users.filter((id) => id !== userId);
      const hubUsersRef = ref(database, "raspberry_hubs/" + selectedHub.id);
      await update(hubUsersRef, { users: updatedHubUsers });

      // Remove the hub ID from the user's hubs_accessible array
      const userHubsRef = ref(database, "users/" + userId);
      const userSnapshot = await get(userHubsRef);
      if (userSnapshot.exists()) {
        const userHubs = userSnapshot.val().hubs_accessible;
        const updatedUserHubs = userHubs?.filter((id) => id !== selectedHub.id);
        await update(userHubsRef, { hubs_accessible: updatedUserHubs });
      }
    } catch (error) {
      console.error("Error removing user from hub:", error);
    }
  };

  return (
    <TouchableOpacity onPress={() => removeUserFromHub(user?.id)}>
      <Ionicons
        name="trash"
        size={20}
        color={globalStyles.primaryColor.color}
      />
    </TouchableOpacity>
  );
};

export default RemoveSubuserFromSelectedHub;
