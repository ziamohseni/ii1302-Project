from picamera2 import Picamera2, Preview
import libcamera
import time

def take_picture(firebase,faceEncodings,prevthread):
    if prevthread != None:
        while prevthread.is_alive():
            pass
    print("capturing image")
    picam2 = Picamera2()
    camera_config = picam2.create_preview_configuration()
    camera_config["transform"] = libcamera.Transform(hflip=1, vflip=1)
    picam2.configure(camera_config)
    picam2.start()
    time.sleep(2)
    picam2.capture_file("temp.jpg")
    picam2.close()
    print("saving image")
    timestamp = time.time()
    
    #The face recognition implementation logic starts from here:
    
    snapshotpath = "snapshots/"+firebase.uid+"/snapshot"+str(timestamp)+".jpg"
    firebase.fbput(snapshotpath,"temp.jpg")  



    fbcamera = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/camera")
    if fbcamera == {}:
        fbcamera = {"type":"camera","status":"active","id":"camera"}
    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/camera",fbcamera)
    if fbcamera["status"] == "active":

        try:
            fbrecent_snapshot = fbcamera["recent_snapshot"]
        except KeyError:
            fbrecent_snapshot = {}
        

        if fbrecent_snapshot:
            try:
                snapshothistory = fbcamera["snapshot_history"]
            except KeyError:
                snapshothistory = {}

            snapshotnum = len(snapshothistory)
            
            if snapshotnum > 0:
                removeshot = None
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

                snapshothistory["snapshot1"]=fbrecent_snapshot 
                fbcamera["snapshot_history"]= snapshothistory
                if removeshot != None:
                    firebase.fbstoragedelete(removeshot)
            else:
                snapshothistory={"snapshot1":fbrecent_snapshot}
            
                fbcamera["snapshot_history"]= snapshothistory

            
        fbcamera["recent_snapshot"] = {"path":snapshotpath, "timestamp":timestamp}
            
    
    firebase.fbupdate("raspberry_hubs/"+firebase.devNum+"/sensors/camera",fbcamera)
    print("camera done")

