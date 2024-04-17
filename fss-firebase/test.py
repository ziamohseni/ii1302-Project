import fssfirebase
import time
defaultState = {"door":False,
                    "flood":False,
                    "smoke":False}

firebase = fssfirebase.FssFirebase()
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