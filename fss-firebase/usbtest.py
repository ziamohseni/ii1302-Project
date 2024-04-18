import psutil
import os
import fssfirebase
import time

def getUserAndPass():
    localuser = os.getlogin()
    while True:
        try:
            userDataUsbPath = False
            while userDataUsbPath == False:
                partitions = psutil.disk_partitions()
                for p in partitions:

                    if ("/media/"+localuser) in p.mountpoint:
                     
                        userDataUsbPath = p.mountpoint
                        break
            


            with open(userDataUsbPath+"/user.txt","r") as userfile:
                username = userfile.readline().split(":")[1].split("\n")[0]
                password = userfile.readline().split(":")[1].split("\n")[0]
            return username,password
        except FileNotFoundError:
            pass

username,password = getUserAndPass()

defaultState = {"door":False,
                    "flood":False,
                    "smoke":False}

firebase = fssfirebase.FssFirebase(username,password)
firebase.fbset(defaultState)

state = firebase.fbget()

state["door"] = True

time.sleep(5)

firebase.fbset(state)

def streamhandler(message):
    print(message)

stream = firebase.fbstream(streamhandler)

time.sleep(25)
stream.close()