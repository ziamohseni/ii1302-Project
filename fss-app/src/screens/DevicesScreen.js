import { Text, View } from "react-native";
// Components
import DevicesList from "../components/devices/DevicesList";
import SelectHub from "../components/global/SelectHub";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/devicesScreenStyles";

function DevicesScreen() {
  return (
    <View style={globalStyles.containerWithPadding}>
      <View style={styles.container}>
        <SelectHub />
        <DevicesList />
      </View>
    </View>
  );
}

export default DevicesScreen;
