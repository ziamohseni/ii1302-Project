import { SafeAreaView, ScrollView, Text, View, Image} from "react-native";
import ActivationButton from "../components/activationButton/ActivationButton";
import SelectHub from "../components/global/SelectHub";
import NoHubsFound from "../components/global/NoHubsFound";
import AlarmTriggeredWarningBar from "../components/global/AlarmTriggeredWarningBar";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/homeScreenStyles";
//logo
import icon from "../../assets/adaptive-icon.png"

function HomeScreen() {
  const {noHubsFound, selectedHub} = useRaspberryHubs();

  function formatDate(timestamp){
    if (!timestamp) return "Never been armed";
    let date = new Date(Math.floor(timestamp));
    return date.toLocaleString();
  }

  function lastArmed(){
    if(noHubsFound || (selectedHub === undefined) || selectedHub.last_armed === undefined) return;
    return (
      <View style = {styles.lastArmedContainer}>
        
        <View style = {styles.imageContainer}>
          <Image source = {icon} style = {{width: 90, height: 90}}/>   
        </View>
        <View>
          <Text style = {styles.lastArmedText}>
            {selectedHub.system_status === "unarmed"?"LAST ARMED ":"ARMED SINCE "}
          </Text>
          <Text style = {styles.timeText}> 
            {formatDate(selectedHub.last_armed)}
          </Text>
        </View>
  
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.containerWithoutPadding}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SelectHub />
          <ActivationButton />
          {lastArmed()}
        </View>
        {noHubsFound && <NoHubsFound />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
