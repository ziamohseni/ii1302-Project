import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
// Context
import { useUser } from "../contexts/UserContext";
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";

function ProfileScreen() {
  // Get user data from context
  const { user, profile } = useUser();
  // Get Raspberry Hubs data from context
  const { hubs, selectHub } = useRaspberryHubs();

  // Function to handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log("Sign out failed");
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome!</Text>
      <Text>User ID: {user.uid}</Text>
      <Text>First Name: {profile?.first_name}</Text>
      <Text>Last Name: {profile?.last_name}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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
