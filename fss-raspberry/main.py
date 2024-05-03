import socket
import time
import camera
import threading
from usbfirebaselogin import getFirebase
import os
import face_recognition
import pickle

################
from alarm import Alarm
###############

def getFaceEncodings(usb_path):
    print("Encoding faces")
    facefiles = os.listdir(usb_path+"/faces")
    try:
        with open ("facepathsfile","r") as facepathsfile:
            loadedfacefiles = facepathsfile.read().splitlines()
        
    except FileNotFoundError:
        loadedfacefiles  =[]
    if not loadedfacefiles == facefiles:
        with open ("facepathsfile","w") as facepathsfile:
            for facefileline in facefiles:
                facepathsfile.write(facefileline+"\n")
        faceencodings = {}
        for facefile in facefiles:
            face = face_recognition.load_image_file(usb_path+"/faces/"+facefile)
            facename = facefile.split("_")[0]
            if facename not in faceencodings:
                faceencodings[facename] = []
            faceencodings[facename].append(face_recognition.face_encodings(face)[0])
        with open("faceencodingsfile", "wb") as faceencfile:
            pickle.dump(faceencodings, faceencfile)
    else:
        with open("faceencodingsfile", "rb") as faceencfile:
            faceencodings = pickle.load( faceencfile)
    return faceencodings

def setupHubForFB(firebase):
    print("Initializing hub")
    admin_data = {}
    admin_data[firebase.uid] = True
    owned_user = firebase.fbget("users/"+firebase.uid+"/hubs_owned")
    if owned_user == {}:
        owned_user = [firebase.devNum]
        firebase.fbset("users/"+firebase.uid+"/hubs_owned/",owned_user)
    else:
        owned_user = list(owned_user.values())
        if not firebase.devNum in owned_user:
            owned_user.append(firebase.devNum)
            firebase.fbset("users/"+firebase.uid+"/hubs_owned/",owned_user)

    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/admin",admin_data)
    hub_data = firebase.fbget("raspberry_hubs/"+firebase.devNum)
    hub_data_changed = False
    if not "system_status" in hub_data.keys():
        hub_data["system_status"] = "armed"
        hub_data_changed = True
    if not "last_armed" in hub_data.keys():
        if hub_data["system_status"] == "armed":
            hub_data["last_armed"] = time.time()
            hub_data_changed = True
    active = hub_data["system_status"]
    if hub_data_changed:
        firebase.fbset("raspberry_hubs/"+firebase.devNum,hub_data)
    return active

def main():
    
    
    
    firebase,usb_path = getFirebase()
    active = setupHubForFB(firebase)
    faceEncodings = getFaceEncodings(usb_path)
    
#Part written by Adalet modified by Jonathan
###########################################################################
    

    
     # Stream callback function to monitor changes in system status
    def system_status_callback(data_snapshot):
        active = data_snapshot["data"]

        # Process sensor status based on active state
        print(active)


    # Start streaming Firebase data for system status changes
    firebase.fbstream("raspberry_hubs/"+firebase.devNum+"/system_status", system_status_callback)
    
###########################################################################


    print("Starting TCP server")

    # Create a TCP/IP socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the address and port
  
    port = 8888
    server_address = ('', port)  # Change to desired host and port
    server_socket.bind(server_address)

    # Listen for incoming connections
    server_socket.listen(5)  # Maximum number of queued connections
    print("TCP server is listening on port "+str(server_address[1]))
    camthread = None
    
    ####################
    alarm_instance = Alarm("alarm.mp3")
    #####################

    while True:
        # Wait for a connection
        print("waiting for new connection")
        connection, client_address = server_socket.accept()
        
        try:
            print("Connection from:", client_address)
            new_hub_data = firebase.fbget("raspberry_hubs/"+firebase.devNum)
            active = new_hub_data["system_status"]
            sensor_objects = new_hub_data["sensors"]
            # Receive data from the client
            data = connection.recv(1024)  # Adjust buffer size as needed
            sensor_data = data.decode().strip().split(":")  
            
            print(sensor_data)
            sensorfound = False
            for sensorkey,sensorvalue in sensor_objects.items():
                if sensorkey == sensor_data[0]:
                    sensorfound = True
                    if active == "armed" and sensorvalue["status"] == "active":

     
                        sensorvalue["triggered"] = eval(sensor_data[2].capitalize())
                        sensorvalue["type"] = sensor_data[1]
                        if sensorvalue["triggered"] == True:
                            sensorvalue["last_active"] = time.time()
                        sensorfound = True
                        if sensor_data[1] == "knock" and eval(sensor_data[2].capitalize()) == True and (not "camera" in sensor_objects.keys() or sensor_objects["camera"]["status"] == "active"):
                            camthread = threading.Thread(target = camera.take_picture, args = (firebase,faceEncodings,camthread))
                            camthread.start()
                            
##################################################################################################
                        elif sensor_data[1] == "door" and eval(sensor_data[2].capitalize()) == True:
                            # Calling the alarm function from the Alarm class instance
                            alarm_instance.start()
##################################################################################################

                    firebase.fbupdate("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensorkey,sensorvalue)
                    break
                   
            if not sensorfound and active == "armed":

                if eval(sensor_data[2].capitalize()) == True:
                    sensor = {"type":sensor_data[1],"triggered":eval(sensor_data[2].capitalize()),"status":"active","id":sensor_data[0],"last_active":time.time()}
                else:
                    sensor = {"type":sensor_data[1],"triggered":eval(sensor_data[2].capitalize()),"status":"active","id":sensor_data[0],"last_active":""}                    

                sensor_objects[sensor_data[0]] = sensor
                firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensor_data[0],sensor)
                print(sensor)
                if sensor_data[1] == "knock"and eval(sensor_data[2].capitalize()) and (not "camera" in sensor_objects.keys() or sensor_objects["camera"]["status"] == "active"):
                    camthread = threading.Thread(target = camera.take_picture, args = (firebase,faceEncodings,camthread))
                    camthread.start()
                

            # Send a response back to the client
            connection.sendall(b"Message received. Thank you!\n")

            
            
        finally:
            # Clean up the connection
            connection.close()

if __name__ == "__main__":
###############################################
    alarm = Alarm("alarm.mp3")
    alarm.start()
    time.sleep(5)  # 5 seconds delay for example
    # Do something else while the alarm is playing...
    input("Press Enter to stop the alarm")
    alarm.stop()
    # main()
###############################################
