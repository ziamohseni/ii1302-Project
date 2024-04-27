import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Contexts
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";

//styles
import styles from "../../styles/activationButtonStyles";

function ActivationButton() {
  const { systemStatus, isSystemArmed, toggleSystemStatus } =
    useRaspberryHubs();

  return (
    <View style={styles.buttonContainer}>
      {isSystemArmed ? (
        <Text style={styles.alarmStatusText}>ALARM ON</Text>
      ) : (
        <Text style={styles.alarmStatusText}>ALARM OFF</Text>
      )}

      <TouchableOpacity
        style={isSystemArmed ? styles.buttonOn : styles.buttonOff}
        onLongPress={() => toggleSystemStatus()}
        delayLongPress={3000}
      >
        <Ionicons name="power" size={200} color={"white"} />
      </TouchableOpacity>

      <Text style={styles.infoText}>HOLD DOWN BUTTON FOR 3 SECONDS</Text>
      {isSystemArmed ? (
        <Text> TO TURN OFF ALARM </Text>
      ) : (
        <Text> TO TURN ON ALARM </Text>
      )}
    </View>
  );
}

export default ActivationButton;
