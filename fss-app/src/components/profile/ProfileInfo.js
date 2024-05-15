import { View, Text, TouchableOpacity, Image } from "react-native";
import ConnectUserToHubButton from "./ConnectUserToHubButton";
import ConnectUserToHubWithQRCode from "../global/ConnectUserToHubWithQRCode";
//context
import { useUser } from "../../contexts/UserContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/profileInfoStyles";
import loginStyles from "../../styles/loginScreenStyles";
// logo
import tempProfilePic from "../../../assets/profilePic.png";

function ProfileInfo() {
  // Get user data from context
  const { user, profile, handleSignOut } = useUser();

  function generateHubsString(hubs) {
    let res = "";
    hubs?.map((hub, index) => {
      if (index !== hubs.length - 1) {
        res = res + hub + ", ";
      } else {
        res = res + hub;
      }
    });
    return res;
  }

  function renderHubs(hubs) {
    string = generateHubsString(hubs);
    return <Text style={styles.infoTextHub}>{string}</Text>;
  }

  return (
    <>
      <View style={[styles.container, globalStyles.shadow]}>
        <View style={styles.imageContainer}>
          <Image source={tempProfilePic} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>First Name </Text>
          <Text style={styles.infoText}> {profile?.first_name} </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Last Name </Text>
          <Text style={styles.infoText}>{profile?.last_name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Email </Text>
          <Text style={styles.infoText}>{user?.email}</Text>
        </View>

        {profile?.hubs_owned && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Hubs Owned </Text>
            {renderHubs(profile?.hubs_owned)}
          </View>
        )}

        {profile?.hubs_accessible && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Hubs Accessible </Text>
            {renderHubs(profile?.hubs_accessible)}
          </View>
        )}

        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={globalStyles.buttonActive}
            onPress={handleSignOut}
          >
            <Text style={loginStyles.text}> SIGN OUT </Text>
          </TouchableOpacity>
          <ConnectUserToHubButton />
        </View>
      </View>
    </>
  );
}

export default ProfileInfo;
