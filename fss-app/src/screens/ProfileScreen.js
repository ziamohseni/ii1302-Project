import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
// Context
import { useUser } from "../contexts/UserContext";

function ProfileScreen() {
  // Get user data from context
  const { user, profile } = useUser();
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
    </View>
  );
}

export default ProfileScreen;
