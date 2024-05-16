import { View, Text } from "react-native";
import ListSubusersForSelectedHub from "./ListSubusersForSelectedHub";
// Styles
import styles from "../../styles/subuserSectionStyles";
import globalStyles from "../../styles/globalStyles";

const SubuserSection = () => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <ListSubusersForSelectedHub />
    </View>
  );
};

export default SubuserSection;
