from picamera2 import Picamera2, Preview
import libcamera
import time
import fssfirebase 

def take_picture(firebase, sensors):
    picam2 = Picamera2()
    camera_config = picam2.create_preview_configuration()
    camera_config["transform"] = libcamera.Transform(hflip=1, vflip=1)
    picam2.configure(camera_config)
    picam2.start()
    time.sleep(2)
    picam2.capture_file("temp.jpg")
    timestamp = time.time()
    snapshot_path = "snapshots/"+firebase.uid+"/snapshot"+str(timestamp)+".jpg"
    firebase.fbput(snapshot_path, "temp.jpg")  
    snapshot_url = firebase.fbstorageurl(snapshot_path)

    for sensor_id, sensor_data in sensors.items():
        if sensor_data["type"] == "camera":
            if firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/recent_snapshot"):
                snapshot_history = {}
                for snapshot_key, snapshot_value in firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/snapshot_history").items():
                    snapshot_history[snapshot_key] = snapshot_value

                snapshot_num = len(snapshot_history)
                if snapshot_num >= 9:
                    # Remove the least recent snapshot
                    oldest_snapshot_key = sorted(snapshot_history.keys())[0]
                    del snapshot_history[oldest_snapshot_key]

                # Shift existing snapshots down the history list
                for i in range(snapshot_num, 1, -1):
                    prev_key = "snapshot" + str(i - 1)
                    curr_key = "snapshot" + str(i)
                    snapshot_history[curr_key] = snapshot_history[prev_key]

                # Store the new snapshot as the most recent
                snapshot_history["snapshot1"] = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/recent_snapshot")

                # Update the snapshot history in Firebase
                firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/snapshot_history", snapshot_history)
            else:
                # If no recent snapshot exists, create new history with the current snapshot
                snapshot_history = {"snapshot1": snapshot_url}
                firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/snapshot_history", snapshot_history)

            # Update the recent snapshot in Firebase
            firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor_id + "/recent_snapshot", {"url": snapshot_url, "timestamp": timestamp})

