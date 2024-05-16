import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import { database } from "../../services/firebaseConfig";
import { ref, get } from "firebase/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import RemoveSubuserFromSelectedHub from "./RemoveSubuserFromSelectedHub";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/listSubusersForSelectedHubStyles";

const ListSubusersForSelectedHub = () => {
  const { selectedHub } = useRaspberryHubs();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (selectedHub?.users) {
      const fetchUsers = async () => {
        try {
          const usersDataPromises = selectedHub?.users.map(async (userId) => {
            const userRef = ref(database, `users/${userId}`);
            const userSnapshot = await get(userRef);
            return { id: userId, ...userSnapshot.val() };
          });

          const usersData = await Promise.all(usersDataPromises);
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }

    return () => {
      setUsers([]);
    };
  }, [selectedHub]);

  return (
    <View style={styles.container}>
      <Text>List of subusers in hub #{selectedHub?.id}</Text>
      {users?.map((user) => (
        <View key={user.id} style={styles.subUserContainer}>
          {/* Subuser info */}
          <View style={styles.subUserInfo}>
            <Ionicons
              name="person"
              size={16}
              color={globalStyles.primaryColor.color}
            />
            <Text>{user.first_name || "Unnamed User"}</Text>
          </View>
          {/* Delete subuser button */}
          {selectedHub?.role === "Admin" && (
            <View>
              <RemoveSubuserFromSelectedHub user={user} />
            </View>
          )}
        </View>
      ))}
      {/* No subusers found */}
      {users.length === 0 && (
        <Text>There are currently no subusers connected to this hub.</Text>
      )}
    </View>
  );
};

export default ListSubusersForSelectedHub;
