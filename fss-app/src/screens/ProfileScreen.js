import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

function ProfileScreen() {
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
      <Text>Profile screen!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

export default ProfileScreen;
