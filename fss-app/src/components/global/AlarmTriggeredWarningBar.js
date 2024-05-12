import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/AlarmTriggeredWarningBarStyles";

function AlarmTriggeredWarningBar({
  miniBar = false,
  warningText = "Alarm has been triggered!",
}) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.alarmContainer,
        miniBar ? styles.alarmMiniBarContainer : styles.alarmBarContainer,
      ]}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("AlarmTriggeredModal")}
      >
        <Animatable.View
          animation="flash"
          easing="ease-in-out"
          iterationCount="infinite"
          style={[styles.flashyContainer, globalStyles.shadow]}
        >
          <Text>
            <Ionicons
              name="warning"
              size={26}
              color={globalStyles.errorColor.color}
            />
          </Text>
          <Text>{warningText}</Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

export default AlarmTriggeredWarningBar;
