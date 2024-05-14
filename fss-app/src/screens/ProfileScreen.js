import { Button, Text, View, SafeAreaView, ScrollView } from "react-native";
import SelectHub from "../components/global/SelectHub";
import ProfileInfo from "../components/profile/ProfileInfo";
import SubuserSection from "../components/profile/SubuserSection";
// Context
import { useUser } from "../contexts/UserContext";
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";

//styles
import globalStyles from "../styles/globalStyles";
import homeScreenStyles from "../styles/homeScreenStyles";

function ProfileScreen() {
  // Get user data from context
  const { user, profile, handleSignOut } = useUser();
  // Get Raspberry Hubs data from context
  const { hubs, selectHub } = useRaspberryHubs();

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={homeScreenStyles.container}>
          <SelectHub />
          <ProfileInfo />
          <SubuserSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
