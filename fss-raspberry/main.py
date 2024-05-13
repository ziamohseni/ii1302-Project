from LEDControl import LED_Control 
import queue
import socket
import time
import camera
import threading
from usbfirebaselogin import getFirebase
import os
import face_recognition
import pickle
from notification import saveAndSendToTokens
from alarm import Alarm



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
    if not "system_is_silent" in hub_data.keys():
        hub_data["system_is_silent"] = False
        hub_data_changed = True
    if not "system_triggered" in hub_data.keys():
        hub_data["system_triggered"] = False
        hub_data_changed = True
    active = hub_data["system_status"]
    if hub_data_changed:
        firebase.fbset("raspberry_hubs/"+firebase.devNum,hub_data)
    return active

def main():
    global active
    LED_queue = queue.Queue()
    LED_queue.put('Boot')
    LED_thread = threading.Thread(target=LED_Control, args=[LED_queue])
    LED_thread.start()
    
    firebase,usb_path = getFirebase(LED_queue)
    active = setupHubForFB(firebase)
    faceEncodings = getFaceEncodings(usb_path)
    alarm_instance = Alarm("alarm.wav")
    global armedboot
    global silencedboot
    global triggeredboot

    armedboot = False
    silencedboot = False
    triggeredboot = False
    

#Part written by Adalet modified by Jonathan
###########################################################################
    

    
     # Stream callback function to monitor changes in system status
    def system_status_callback(data_snapshot):
        global armedboot
        global active
        if armedboot:
            active = data_snapshot["data"]
            push_tokens = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/push_tokens")

            saveAndSendToTokens("Hub "+firebase.devNum+" "+active.capitalize(),"Hub "+firebase.devNum+" has become "+active.lower(),push_tokens.values(),"Info",firebase)
        # Process sensor status based on active state
            print(active)
            if active == "unarmed":
                alarm_instance.stop()
        LED_queue.put(active.capitalize()) 
        armedboot = True


    # Start streaming Firebase data for system status changes
    firebase.fbstream("raspberry_hubs/"+firebase.devNum+"/system_status", system_status_callback)
    
###########################################################################
    def system_silenced_callback(data_snapshot):
        global silencedboot 
        global active
        if silencedboot:
            silenced = data_snapshot["data"]
            hub_data = firebase.fbget("raspberry_hubs/"+firebase.devNum)
            push_tokens = hub_data["push_tokens"]
            trigg = hub_data["system_triggered"]

            if trigg == True:
                if silenced == True:
                    alarm_instance.stop()
                    #LED_queue.put(active.capitalize())
                    saveAndSendToTokens("Hub " +firebase.devNum+" silenced","Hub "+firebase.devNum+" has been silenced",push_tokens,"Info",firebase)
                    print("Alarm silenced")
                else:
                    alarm_instance.start()
                    #LED_queue.put('Alarm')
                    saveAndSendToTokens("Hub " +firebase.devNum+" unsilenced","Hub "+firebase.devNum+" has been unsilenced",push_tokens,"Info",firebase)
                    print("Alarm unsilenced")
        silencedboot = True
    firebase.fbstream("raspberry_hubs/"+firebase.devNum+"/system_is_silent",system_silenced_callback)

    def system_triggered_callback(data_snapshot):
        global triggeredboot 
        global active
        time.sleep(0.1)
        if triggeredboot and active=="armed":
            triggered = data_snapshot["data"]
            print(triggered)
            push_tokens = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/push_tokens")
            if triggered == False:
                alarm_instance.stop()
                LED_queue.put(active.capitalize())
                saveAndSendToTokens("Hub " +firebase.devNum+" stopped alarm","Hub "+firebase.devNum+" has stopped alarm",push_tokens.values(),"Info",firebase)
                print("Alarm silenced")
        triggeredboot = True


    firebase.fbstream("raspberry_hubs/"+firebase.devNum+"/system_triggered",system_triggered_callback)

    print("Starting TCP server")

    # Create a TCP/IP socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the address and port
  
    port = 8888
    ip_address_to_rasp = "10.42.0.1"
    server_address = (ip_address_to_rasp, port)  # Change to desired host and port
    server_socket.bind(server_address)

    # Listen for incoming connections
    server_socket.listen(5)  # Maximum number of queued connections
    print("TCP server is listening on port "+str(server_address[1]))
    camthread = None
    

    while True:
        # Wait for a connection
        print("Waiting for new connection")
        connection, client_address = server_socket.accept()
        
        try:
            print("Connection from:", client_address)
            hub_data = firebase.fbget("raspberry_hubs/"+firebase.devNum)
            active = hub_data["system_status"]
            sensor_objects = hub_data["sensors"]
            # Receive data from the client
            data = connection.recv(1024)  # Adjust buffer size as needed
            sensor_data = data.decode().strip().split(":")  
            
            print(sensor_data)
            sensorfound = False
            alarm_title_string = "Alarm Triggered at hub "+firebase.devNum+"!"
            alarm_body_string = "Alarm triggered by "+sensor_data[1]+" sensor with id "+sensor_data[0]
            knock_title_string = "Knock at hub "+firebase.devNum+"!"
            knock_body_string = "Knock detected by sensor with id "+sensor_data[0]
            for sensorkey,sensorvalue in sensor_objects.items():
                if sensorkey == sensor_data[0]:
                    sensorfound = True
                    if active == "armed" and sensorvalue["status"] == "active":
                        sensorvalue["triggered"] = eval(sensor_data[2].capitalize())
                        sensorvalue["type"] = sensor_data[1]
                        if sensorvalue["triggered"] == True:
                            sensorvalue["last_triggered"] = time.time()
                        sensorfound = True
                        if sensor_data[1] == "knock" and eval(sensor_data[2].capitalize()) == True and (not "camera" in sensor_objects.keys() or sensor_objects["camera"]["status"] == "active"):
                            saveAndSendToTokens(knock_title_string,knock_body_string,hub_data["push_tokens"],"Alarm",firebase)
                            camthread = threading.Thread(target = camera.take_picture, args = (firebase,faceEncodings,camthread))
                            camthread.start()
                            

                        elif eval(sensor_data[2].capitalize()) == True:
                            # Calling the alarm function from the Alarm class instance
                            alarm_instance.start()
                            LED_queue.put('Alarm')
                            saveAndSendToTokens(alarm_title_string,alarm_body_string,hub_data["push_tokens"],"Alarm",firebase)
                            firebase.fbupdate("raspberry_hubs/"+firebase.devNum,{"system_triggered":True})


                        
                        
                        

                    firebase.fbupdate("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensorkey,sensorvalue)
                    break
                   
            if not sensorfound and active == "armed":

                if eval(sensor_data[2].capitalize()) == True:
                    sensor = {"type":sensor_data[1],"triggered":eval(sensor_data[2].capitalize()),"status":"active","id":sensor_data[0],"last_active":time.time(),"last_triggered":time.time()}
                    
                    

                    if sensor_data[1] == "knock" and (not "camera" in sensor_objects.keys() or sensor_objects["camera"]["status"] == "active"):
                        saveAndSendToTokens(knock_title_string,knock_body_string,hub_data["push_tokens"],"Alarm",firebase)
                        camthread = threading.Thread(target = camera.take_picture, args = (firebase,faceEncodings,camthread))
                        camthread.start()
              
                    else:
                        # Calling the alarm function from the Alarm class instance
                        alarm_instance.start()
                        LED_queue.put('Alarm')
                        saveAndSendToTokens(alarm_title_string,alarm_body_string,hub_data["push_tokens"],"Alarm",firebase)
                        firebase.fbupdate("raspberry_hubs/"+firebase.devNum,{"system_triggered":True})

                else:
                    sensor = {"type":sensor_data[1],"triggered":eval(sensor_data[2].capitalize()),"status":"active","id":sensor_data[0],"last_active":time.time(),"last_triggered":""}                    

                sensor_objects[sensor_data[0]] = sensor
                firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensor_data[0],sensor)
                print(sensor)
            # Send a response back to the client
            connection.sendall(b"Message received. Thank you!\n")

            
            
        finally:
            # Clean up the connection
            connection.close()

if __name__ == "__main__":
    main()

