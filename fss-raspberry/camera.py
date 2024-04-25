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
    snapshoturl = firebase.fbstorageurl(snapshotpath)

    for sensor in sensors.items():
        if sensor[1]["type"]=="camera":
            print("huh")
            if firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot"):
                snapshothistory = {}
                for snapshot in firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/snapshot_history"):
                    snapshothistory[snapshot] =  firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/snapshot_history/"+snapshot)
                snapshotnum = len(snapshothistory)
                print(snapshothistory)
                if snapshotnum > 0:
                    if snapshotnum != 9:
                        snapshothistory["snapshot"+str(snapshotnum +1)] = snapshothistory["snapshot"+str(snapshotnum)] 

                    for snapshot in snapshothistory:
                        snapshothistory["snapshot"+str(snapshotnum)] = snapshothistory["snapshot"+str(snapshotnum-1)] 
                
                    snapshothistory["snapshot1"]=firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot") 
                    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/snapshot_history", firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot"))
                else:
                    snapshothistory["snapshot1"]=firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot") 
                    print(firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot"))                   
                    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/snapshot_history", firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot"))

                  
            firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/" + sensor[0] + "/recent_snapshot", {"url":snapshoturl, "timestamp":timestamp})
