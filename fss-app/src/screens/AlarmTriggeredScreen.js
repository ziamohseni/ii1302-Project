import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/alarmTriggeredScreenStyles";

function AlarmTriggeredScreen() {
  const navigation = useNavigation();
  const { isAlarmTriggered, hubs } = useRaspberryHubs();

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>
          <Text style={globalStyles.title}>Alarm Triggered</Text>
          <Text style={globalStyles.text}>
            An alarm has been triggered. Please evacuate the building
          </Text>
        </View>
        {/* Close button */}
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="close-circle-outline"
              size={60}
              color={globalStyles.lightColor.color}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AlarmTriggeredScreen;
