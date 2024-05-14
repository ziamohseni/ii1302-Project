import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RecentCameraSnapshot from "../components/notificationsscreen/RecentCameraSnapshot";
import CameraSnapshotHistory from "../components/camerahistoryscreen/CameraSnapshotHistory";
// Styles
import globalStyles from "../styles/globalStyles";
import styles from "../styles/cameraHistoryScreenStyles";

const CameraHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ScrollView>
          <View style={styles.content}>
            {/* Recent Snapshot */}
            <Text style={styles.title}>Recent Camera Snapshot</Text>
            <RecentCameraSnapshot />
            {/* Camera History */}
            <Text style={styles.title}>Camera History</Text>
            <CameraSnapshotHistory />
          </View>
        </ScrollView>
        {/* Close button */}
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="close-circle-outline"
              size={60}
              color={globalStyles.darkColor.color}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CameraHistoryScreen;
