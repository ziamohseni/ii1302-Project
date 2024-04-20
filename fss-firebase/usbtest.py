import psutil
import os
import fssfirebase
import time
import wifi
import subprocess


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
                wifissid = userfile.readline().split(":")[1].split("\n")[0]
                wifipass = userfile.readline().split(":")[1].split("\n")[0]
                
            return username,password,wifissid,wifipass
        except FileNotFoundError:
            while psutil.disk_partitions == partitions:
                pass


username,password,wifissid,wifipass = getUserAndPass()
wificonnected = "no"
try:
    wificonnected = subprocess.check_output(["nmcli","-f","GENERAL.STATE","con","show",wifissid])
except subprocess.CalledProcessError:
    pass



while "activated" not in str(wificonnected):
    print("loop")
    try:
        wifi_networks = wifi.Cell.all('wlan0')
        for wifi_net in wifi_networks:
            
            if wifi_net.ssid == wifissid:
                try:
                    subprocess.check_output(["nmcli", "dev", "wifi", "connect", wifissid, "password", wifipass])
                    print("try")
                    wificonnected = subprocess.check_output(["nmcli","-f","GENERAL.STATE","con","show",wifissid])
                except subprocess.CalledProcessError:
                    username,password,wifissid,wifipass = getUserAndPass()
    
            else:
                username,password,wifissid,wifipass = getUserAndPass()
    except wifi.exceptions.InterfaceError:
        pass
    
print("connected!")
            

        




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