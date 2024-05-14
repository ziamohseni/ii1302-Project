import { View, Text } from "react-native";
// Styles
import styles from "../../styles/subuserSectionStyles";
import globalStyles from "../../styles/globalStyles";

const SubuserSection = () => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <Text>Sub user lists and remove sub user coming soon.</Text>
    </View>
  );
};

export default SubuserSection;
