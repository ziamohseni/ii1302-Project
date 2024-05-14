import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import { useRaspberryHubs } from "../../contexts/RaspberryHubsContext";
import convertUnixTimestampToDate from "../../utils/convertUnixTimestampToDate";
// Styles
import styles from "../../styles/cameraSnapshotHistoryStyles";
import globalStyles from "../../styles/globalStyles";

const CameraSnapshotHistory = () => {
  const { selectedHub } = useRaspberryHubs();
  const [loading, setLoading] = useState(true);
  const [cameraSnapshotHistory, setCameraSnapshotHistory] = useState([]);

  // Get camera snapshots
  useEffect(() => {
    // Function Get camera snapshots
    const getCameraSnapshots = async () => {
      setLoading(true);
      if (selectedHub) {
        let snapshots = selectedHub.sensors.camera.snapshot_history;
        snapshots = Object.values(snapshots);
        const snapshotsArray = [];
        for (const snapshot of snapshots) {
          const storageRef = ref(storage, snapshot.path);
          const url = await getDownloadURL(storageRef);
          snapshotsArray.push({ url, info: snapshot });
        }
        setCameraSnapshotHistory(snapshotsArray);
      }
      setLoading(false);
    };
    getCameraSnapshots();

    return () => {
      setCameraSnapshotHistory([]);
    };
  }, [selectedHub]);

  return (
    <View style={styles.snapshotItemContainer}>
      {/* Loader */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={globalStyles.darkColor.color}
          style={{ marginTop: 50 }}
        />
      )}
      {/* Snapshots */}
      {cameraSnapshotHistory?.map((snapshot, index) => (
        <View key={index} style={styles.snapshotItem}>
          <Image source={{ uri: snapshot.url }} style={styles.image} />
          <Text>Name: {snapshot.info.name}</Text>
          <Text>
            Date: {convertUnixTimestampToDate(snapshot.info.timestamp)}
          </Text>
        </View>
      ))}
      {/* No Snapshots */}
      {cameraSnapshotHistory.length === 0 && !loading && (
        <Text style={styles.noSnapshotText}>
          No snapshots history available
        </Text>
      )}
    </View>
  );
};

export default CameraSnapshotHistory;
