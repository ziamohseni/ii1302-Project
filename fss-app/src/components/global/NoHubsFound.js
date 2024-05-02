import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/noHubsFoundStyles";

function NoHubsFound() {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, globalStyles.shadow]}>
        <View style={styles.titleContainer}>
          <Text>
            <Ionicons
              name="alert-circle"
              size={28}
              color={globalStyles.errorColor.color}
            />{" "}
          </Text>
          <Text style={styles.title}>No Hubs Found!</Text>
        </View>
        <Text>
          There are no hubs registered to your account. If you recently
          purchased a 5Sense Security hub, please refer to the package
          instructions to register your hub.
        </Text>
        <Text>
          If you are a family member, ask the hub owner to add you as a user.
        </Text>
      </View>
    </View>
  );
}

export default NoHubsFound;
