import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";

//styles
import styles from "../../styles/activationButtonStyles";
import globalStyles from "../../styles/globalStyles";

function ActivationButton() {
  const { systemStatus, isSystemArmed, toggleSystemStatus } =
    useRaspberryHubs();

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
          onLongPress={() => toggleSystemStatus()}
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
