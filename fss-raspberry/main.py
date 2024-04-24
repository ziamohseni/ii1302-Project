import socket

import subprocess
import fssfirebase
from firebaselogin import getFirebase


def main():
    
    
    
    firebase = getFirebase()
    admin_data = {}
    admin_data[firebase.uid] = True
    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/admin",admin_data)
    sensorsdirs = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors")
    sensor_objects = {}
    for sensor in sensorsdirs:
        sensor_objects[sensor] = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensor)
    
    


    #Get ip using subprocess
    ipstrings = str((subprocess.check_output(["ip","addr","show","wlan0"])))
    ipstrings = ipstrings.split(" ")
    stringindex = 0
    for ipstring in ipstrings:
        if "inet" in ipstring:
            ipaddr = ipstrings[stringindex+1].split("/")[0]
            break
        stringindex+=1


    # Create a TCP/IP socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to the address and port
  
    port = 8888
    server_address = (ipaddr, port)  # Change to desired host and port
    server_socket.bind(server_address)

    # Listen for incoming connections
    server_socket.listen(5)  # Maximum number of queued connections

    print("TCP server is listening on {}:{}".format(*server_address))

    while True:
        # Wait for a connection
        connection, client_address = server_socket.accept()

        try:
            print("Connection from:", client_address)

            # Receive data from the client
            data = connection.recv(1024)  # Adjust buffer size as needed
            sensor_data = data.decode() .split(":")  
            match sensor_data[0]:
                case "door":
                    for sensor in sensor_objects:
                        if "door" in sensor.type:
                            sensor["triggered"] = eval(sensor_data.capitalize())
                case "flood":
                    for sensor in sensor_objects:
                        if "flood" in sensor.type:
                            sensor["triggered"] = eval(sensor_data.capitalize())
                case "knock":
                    

                    for sensor in sensor_objects:
                        if "knock" in sensor.type:
                            sensor["triggered"] = eval(sensor_data.capitalize())
                

            # Send a response back to the client
            connection.sendall(b"Message received. Thank you!")
            for sensor in sensorsdirs:
                firebase.fbset("raspberry_hubs/"+firebase.devNum+"/sensors/"+sensor,sensor_objects["sensor"])
        finally:
            # Clean up the connection
            connection.close()

if __name__ == "__main__":
    main()