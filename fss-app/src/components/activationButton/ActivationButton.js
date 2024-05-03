import React, { useState } from "react";
import { Text, TouchableOpacity, View, Vibration } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import styles from "../../styles/activationButtonStyles";
import globalStyles from "../../styles/globalStyles";

function ActivationButton() {
  const { isSystemArmed, toggleSystemStatus } = useRaspberryHubs();
  const [buttonPressTimer, setButtonPressTimer] = useState(null);

  // Handle button press in and toggle system status after 3 seconds
  const handlePressIn = () => {
    const timer = setTimeout(() => {
      toggleSystemStatus();
      Vibration.vibrate(100);
    }, 3000);
    setButtonPressTimer(timer);
  };

  // Handle button press out and clear the timer
  const handlePressOut = () => {
    if (buttonPressTimer) {
      clearTimeout(buttonPressTimer);
      setButtonPressTimer(null);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.alarmStatusText}>
        ALARM {isSystemArmed ? "ON" : "OFF"}
      </Text>

      <View
        style={isSystemArmed ? styles.buttonOnBorder : styles.buttonOffBorder}
      >
        <TouchableOpacity
          style={[
            isSystemArmed ? styles.buttonOn : styles.buttonOff,
            globalStyles.shadow,
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          delayLongPress={3000}
        >
          <Ionicons name="power" size={200} color={"white"} />
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        HOLD DOWN BUTTON FOR 3 SECONDS TO TURN {isSystemArmed ? "OFF" : "ON"}{" "}
        ALARM
      </Text>
    </View>
  );
}

export default ActivationButton;
