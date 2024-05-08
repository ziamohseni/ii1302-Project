import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
// Context
import { useUser } from "../contexts/UserContext";
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";

//ProfileInfo
import ProfileInfo from "../components/profile/ProfileInfo";

function ProfileScreen() {
  // Get user data from context
  const { user, profile, handleSignOut } = useUser();
  // Get Raspberry Hubs data from context
  const { hubs, selectHub } = useRaspberryHubs();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <ProfileInfo />
      
      <View>
        <Text>Raspberry Hubs:</Text>
        {hubs.map((hub) => (
          <View key={hub.id}>
            <Text>Hub ID: {hub.id}</Text>
            <Button title="Select Hub" onPress={() => selectHub(hub.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default ProfileScreen;
