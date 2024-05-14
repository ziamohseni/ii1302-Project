import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import convertUnixTimestampToDate from "../../utils/convertUnixTimestampToDate";
// Styles
import globalStyles from "../../styles/globalStyles";
import styles from "../../styles/notificationsHistoryScreenStyles";

const RecentCameraSnapshot = () => {
  const navigation = useNavigation();
  const { selectedHub, noHubsFound } = useRaspberryHubs();
  const [recentCameraSnapshotUrl, setRecentCameraSnapshotUrl] = useState(null);
  const [recentCameraSnapshotInfo, setRecentCameraSnapshotInfo] =
    useState(null);

  // Get recent camera snapshot
  useEffect(() => {
    // Function Get recent camera snapshot
    const getRecentCameraSnapshot = async () => {
      if (selectedHub) {
        const recentSnapshot = selectedHub.sensors.camera.recent_snapshot;
        const storageRef = ref(storage, recentSnapshot.path);
        const url = await getDownloadURL(storageRef);
        setRecentCameraSnapshotUrl(url);
        setRecentCameraSnapshotInfo(recentSnapshot);
      }
    };
    getRecentCameraSnapshot();

    return () => {
      setRecentCameraSnapshotUrl(null);
      setRecentCameraSnapshotInfo(null);
    };
  }, [selectedHub]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CameraHistoryModal")}
      style={styles.recentCameraSnapshotContainer}
    >
      {recentCameraSnapshotUrl ? (
        <View style={styles.recentCameraSnapshot}>
          <Image
            source={{ uri: recentCameraSnapshotUrl }}
            style={styles.recentCameraSnapshotImage}
          />
          <Text>
            Name:{" "}
            {recentCameraSnapshotInfo
              ? recentCameraSnapshotInfo.name
              : "Unknown"}
          </Text>
          <Text>
            Time:{" "}
            {recentCameraSnapshotInfo
              ? convertUnixTimestampToDate(recentCameraSnapshotInfo.timestamp)
              : "Unknown"}
          </Text>
        </View>
      ) : (
        <View style={styles.noRecentCameraSnapshot}>
          <Text>No recent camera snapshot found</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RecentCameraSnapshot;
