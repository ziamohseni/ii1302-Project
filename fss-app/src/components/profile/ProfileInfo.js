import { View, Text, TouchableOpacity, Image} from "react-native";
import { signOut } from "firebase/auth";
//context
import { useUser } from "../../contexts/UserContext";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/profileInfoStyles";
import loginStyles from "../../styles/loginScreenStyles";
// logo
import tempProfilePic from "../../../assets/profilePic.png"



function ProfileInfo(){
    // Get user data from context
    const { user, profile, handleSignOut } = useUser();

    console.log("prof", profile);
    console.log("user", user);

    function generateHubsString(hubs){
        let res = "";
        profile.hubs_owned.map((hub, index) => {
            if (index !== profile.hubs_owned.length - 1) {
                res = res + hub + ", ";
            } else {
                res = res + hub;
            }
        });
        return res;
    }

    function renderHubs(hubs){
        string = generateHubsString(hubs)
        return(
            <Text style = {styles.infoTextHub}>{string}</Text>
        );
    }

    return(
        <>
        <View style = {[styles.container, globalStyles.shadow]}>
            
            <View style = {styles.imageContainer}>
                <Image source = {tempProfilePic} style = {styles.image} />
            </View>

            <View style ={styles.infoContainer}>
                <Text style = {styles.infoTitle}>First Name </Text>
                <Text style = {styles.infoText}> {profile?.first_name} </Text>
            </View>

            <View style ={styles.infoContainer}>
                <Text style = {styles.infoTitle}>Last Name </Text>
                <Text style = {styles.infoText}>{profile?.last_name}</Text>
            </View>

            <View style ={styles.infoContainer}>
                <Text style = {styles.infoTitle}>Email </Text>
                <Text style = {styles.infoText}>{user?.email}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style = {styles.infoTitle}>Hubs Owned </Text>
                {renderHubs(profile.hubs_owned)}
            </View>

            <View style = {styles.signOutContainer}>
                <Text style = {styles.signOutText}>
                    Want to change account or sign out?
                </Text>
                <TouchableOpacity style = {globalStyles.buttonActive} onPress={handleSignOut}> 
                    <Text style = {loginStyles.text}> SIGN OUT </Text> 
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}

export default ProfileInfo;