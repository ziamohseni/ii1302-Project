import { View, Text } from "react-native";
// Styles
import styles from "../../styles/subuserSectionStyles";
import globalStyles from "../../styles/globalStyles";

const SubuserSection = () => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <Text>SubuserSection</Text>
    </View>
  );
};

export default SubuserSection;
