import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
// Styles
import styles from "../../styles/activationButtonStyles";
import globalStyles from "../../styles/globalStyles";

function ActivationButton() {
  const { isSystemArmed, toggleSystemStatus } = useRaspberryHubs();
  const [buttonPressTimer, setButtonPressTimer] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkAnimation = useRef(new Animated.Value(0)).current;

  const handleBlinkAnimation = () => {
    blinkAnimation.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 15 }
    ).start(() => {
      setIsBlinking(false);
    });
  };

  useEffect(() => {
    if (isBlinking) {
      handleBlinkAnimation();
    }
  }, [isBlinking]);

  const handlePressIn = () => {
    setIsBlinking(true);
    const timer = setTimeout(() => {
      toggleSystemStatus();
      Vibration.vibrate(100);
      setIsBlinking(false);
    }, 3000);
    setButtonPressTimer(timer);
  };

  // Handle button press out and clear the timer
  const handlePressOut = () => {
    if (buttonPressTimer) {
      clearTimeout(buttonPressTimer);
      setButtonPressTimer(null);
      setIsBlinking(false);
    }
  };

  const borderColor = blinkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isSystemArmed
        ? globalStyles.dangerColor.color
        : globalStyles.successColor.color,
      globalStyles.lightColor.color,
    ],
  });

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.alarmStatusText}>
        ALARM {isSystemArmed ? "ON" : "OFF"}
      </Text>

      <Animated.View
        style={[
          isSystemArmed ? styles.buttonOnBorder : styles.buttonOffBorder,
          isBlinking && { borderColor },
        ]}
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
          <Ionicons
            name="power"
            size={200}
            color={globalStyles.lightColor.color}
          />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.infoText}>
        HOLD DOWN BUTTON FOR 3 SECONDS TO TURN {isSystemArmed ? "OFF" : "ON"}{" "}
        ALARM
      </Text>
    </View>
  );
}

export default ActivationButton;
