import fssfirebase
import time
defaultState = {"door":False,
                    "flood":False,
                    "smoke":False}

with open("user.txt","r") as userfile:
    username = userfile.readline().split(":")[1].split("\n")[0]
    password = userfile.readline().split(":")[1].split("\n")[0]

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