import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
// Contexts
import { useRaspberryHubs } from "../contexts/RaspberryHubsContext";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/alarmTriggeredScreenStyles";

function AlarmTriggeredScreen() {
  const navigation = useNavigation();
  const {
    isAlarmTriggered,
    triggeredHubs,
    toggleSystemIsSilentStatus,
    changeSensorTriggeredStatusToFalse,
  } = useRaspberryHubs();

  // Handle toggle sensor triggered status to false and go back
  const handleToggleSensorTriggeredStatusToFalseAndGoBack = (hub) => {
    changeSensorTriggeredStatusToFalse(hub);
    navigation.goBack();
  };

  // Render triggered hubs
  const renderTriggeredHubs = triggeredHubs?.map((hub) => {
    return (
      <View key={hub.id} style={styles.triggeredHubContainer}>
        <Text style={styles.triggeredHubInfo}>
          Hub #{hub.id} has been triggered.
        </Text>
        {/* Retoggle sensor status to false */}
        <TouchableOpacity
          onPress={() => handleToggleSensorTriggeredStatusToFalseAndGoBack(hub)}
        >
          <Ionicons
            name="refresh"
            size={30}
            color={globalStyles.darkColor.color}
          />
        </TouchableOpacity>
        {/* Toggle system alarm sound */}
        <TouchableOpacity onPress={() => toggleSystemIsSilentStatus(hub)}>
          <Ionicons
            name={hub.system_is_silent ? "volume-mute" : "volume-high"}
            size={30}
            color={globalStyles.darkColor.color}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>
          {isAlarmTriggered ? (
            <>
              {/* Warning icon */}
              <Animatable.View
                animation="flash"
                iterationCount="infinite"
                style={globalStyles.shadow}
              >
                <Ionicons
                  name="warning"
                  size={60}
                  color={globalStyles.lightColor.color}
                />
              </Animatable.View>
              {/* Info */}
              <View>
                <Text style={styles.title}>Alarm has been triggered!</Text>
                <Text style={styles.subTitle}>
                  For more detailed information, please visit the
                  'Notifications' and 'Devices' tabs. There, you can view
                  specific details and statuses for each triggered hub and
                  sensors.
                </Text>
              </View>
              {/* Triggered hubs */}
              {renderTriggeredHubs}
            </>
          ) : (
            <Text style={styles.title}>
              Everything is fine, you can close this message.
            </Text>
          )}
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
