import { Text, View } from "react-native";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/noHubsFoundStyles";

function NoHubsFound() {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, globalStyles.shadow]}>
        <Text style={styles.title}>No Hubs Found!</Text>
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
