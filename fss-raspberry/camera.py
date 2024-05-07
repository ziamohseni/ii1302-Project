from picamera2 import Picamera2
import libcamera
import time
import face_recognition
from notification import sendNotification


def do_face_recog(faceEncodings):
    facename = "unknown"
    matchnumber = -1

    # Load the captured image and extract face encodings
    face_image = face_recognition.load_image_file("temp.jpg")

    try:
        new_face_encoding = face_recognition.face_encodings(face_image)[0]

        # Compare new face encodings with known face encodings
        resdict = {}
        for name, known_encodings in faceEncodings.items():

            
            face_distances = face_recognition.face_distance(known_encodings,new_face_encoding)

            resdict[name] = min(face_distances)



        minresultlist = None
        for name,result in resdict.items():

            if minresultlist == None or minresultlist[1] > result:
                minresultlist = [name,result]
        if minresultlist[1] < 0.6:
            facename = minresultlist[0]
            matchnumber = minresultlist[1]
    except IndexError:
        pass
    return facename,matchnumber

def take_picture(firebase,faceEncodings,prevthread):
    if prevthread != None:
        while prevthread.is_alive():
            pass
    print("Capturing image")
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
    
############################################################################################
    facename,matchnumber = do_face_recog(faceEncodings)
    print("Detected face matches "+str(facename)+" with precicion of "+str(matchnumber))
############################################################################################

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

            
        fbcamera["recent_snapshot"] = {"path":snapshotpath, "timestamp":timestamp,"name":facename}
            
    
    firebase.fbupdate("raspberry_hubs/"+firebase.devNum+"/sensors/camera",fbcamera)

    for token in firebase.fbget("raspberry_hubs/"+firebase.devNum+"/push_tokens"):
        sendNotification(facename.capitalize()+" At Door","Image of "+facename+" has been captured",token,"Camera")
    print("Camera done")

