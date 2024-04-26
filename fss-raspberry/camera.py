from picamera2 import Picamera2, Preview
import libcamera
import time
import fssfirebase 

def take_picture(firebase,sensors):
    picam2 = Picamera2()
    camera_config = picam2.create_preview_configuration()
    camera_config["transform"] = libcamera.Transform(hflip=1, vflip=1)
    picam2.configure(camera_config)
    picam2.start()
    time.sleep(2)
    picam2.capture_file("temp.jpg")
    timestamp = time.time()
    snapshotpath = "snapshots/"+firebase.uid+"/snapshot"+str(timestamp)+".jpg"
    firebase.fbput(snapshotpath,"temp.jpg")  

    if "camera" not in sensors.keys():
        sensors["camera"] = {"type":"camera","status":"active"}

    if sensors["camera"]["status"] == "active":
        for sensorname,sensorvalue in sensors.items():
            if sensorvalue["type"]=="camera":
                
                recent_snap_path = "raspberry_hubs/"+firebase.devNum+"/sensors/" + sensorname + "/recent_snapshot"
                snap_hist_path = "raspberry_hubs/"+firebase.devNum+"/sensors/" + sensorname + "/snapshot_history"

                if firebase.fbget(recent_snap_path):
                    snapshothistory = firebase.fbget(snap_hist_path)
                    snapshotnum = len(snapshothistory)

                    if snapshotnum > 0:
                        removeshot = "null"
                        if snapshotnum != 9:
                            snapshothistory["snapshot"+str(snapshotnum +1)] = snapshothistory["snapshot"+str(snapshotnum)] 
                        else:
                            removeshot = snapshothistory["snapshot9"]["path"]

                        for snapshot in snapshothistory:
                            if snapshotnum > 1:
                                snapshothistory["snapshot"+str(snapshotnum)] = snapshothistory["snapshot"+str(snapshotnum-1)]
                                snapshotnum -=1
                            else:
                                break

                        snapshothistory["snapshot1"]=firebase.fbget(recent_snap_path) 
                        sensors["camera"]["snapshot_history"]= snapshothistory
                        if removeshot != "null":
                            firebase.fbstoragedelete(removeshot)
                    else:
                        snapshothistory={"snapshot1":firebase.fbget(recent_snap_path)}
                    
                        sensors["camera"]["snapshot_history"]= snapshothistory

                    
                sensors["camera"]["recent_snapshot"] = {"path":snapshotpath, "timestamp":timestamp}
                break
    picam2.close()
    return sensors