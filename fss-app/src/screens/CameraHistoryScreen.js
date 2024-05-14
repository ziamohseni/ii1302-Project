import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// Styles
import globalStyles from "../styles/globalStyles";

const CameraHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>CameraHistoryScreen</Text>
      {/* Close button */}
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="close-circle-outline"
            size={60}
            color={globalStyles.lightColor.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraHistoryScreen;
