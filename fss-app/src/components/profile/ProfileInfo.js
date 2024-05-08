import { View, Text, TouchableOpacity} from "react-native";
import { signOut } from "firebase/auth";

//context
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import { useUser } from "../../contexts/UserContext";

// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/profileInfoStyles";
import loginStyles from "../../styles/loginScreenStyles";

function ProfileInfo(){
    // Get user data from context
    const { user, profile, handleSignOut } = useUser();
    // Get Raspberry Hubs data from context
    const { hubs, selectHub } = useRaspberryHubs();

    let renderHubs = profile.hubs_owned?.map((hub) => (

        <Text style = {styles.infoText}>
            {hub}{profile.hubs_owned.indexOf(hub) !== profile.hubs_owned.length - 1? ", ":""}
        </Text>
    ));

    return(
        <View style = {[styles.container, globalStyles.shadow]}>
            
            <Text style = {styles.infoTitle}>
                First Name: <Text style = {styles.infoText}> {profile?.first_name} </Text>
            </Text> 
            <Text style = {styles.infoTitle}>
                Last Name: <Text style = {styles.infoText}>{profile?.last_name}</Text>
            </Text>
            <Text style = {styles.infoTitle}>
                Email: <Text style = {styles.infoText}>{user?.email}</Text>
            </Text>
            <Text style = {styles.infoTitle}>
                User ID: <Text style = {styles.infoText}>{user?.uid}</Text>
            </Text>
            <View style={styles.hubs}>
                <Text style = {styles.infoTitle}>Hubs Owned: {renderHubs} </Text>
            </View>
            
            <TouchableOpacity style = {globalStyles.buttonActive} onPress={handleSignOut}> 
                <Text style = {loginStyles.text}> SIGN OUT </Text> 
            </TouchableOpacity>
        </View>
    );
}

export default ProfileInfo;