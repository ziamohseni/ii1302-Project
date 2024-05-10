import psutil
import fssfirebase
import wifilogin
import time



def getUserAndPass():
    print("Getting usb data")
    localuser = "admin"
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
                
            return username,password,wifissid,wifipass,userDataUsbPath
        except FileNotFoundError:
            while psutil.disk_partitions == partitions:
                pass



            
def getFirebase(LED_q):
    
    wifi_status = False
    while not wifi_status:
        username,password,wifissid,wifipass,userDataUsbPath = getUserAndPass()
        #wifi_status = wifilogin.connectWifi(wifissid,wifipass)
        wifi_status = True
        if not wifi_status:
            LED_q.put("WifiError")
    time.sleep(20)
    while True:
        print("Logging in to firebase")
        try:
            firebase = fssfirebase.FssFirebase(username,password)
            break
        except fssfirebase.InvalidFBLoginInfoError:
            LED_q.put("FirebaseError")
            username,password,wifissid,wifipass,userDataUsbPath = getUserAndPass()
    return firebase,userDataUsbPath
