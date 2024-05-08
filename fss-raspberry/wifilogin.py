import subprocess


def connectWifi(wifissid,wifipass):
    print("Connecting wifi")
    wificonnected = None
    try:
        wificonnected = subprocess.check_output(["nmcli","-f","GENERAL.STATE","con","show",wifissid])
    except subprocess.CalledProcessError:
        pass



    while "activated" not in str(wificonnected):
 
        try:
            subprocess.check_output(["nmcli", "dev", "wifi", "connect", wifissid, "password", wifipass,"ifname", "wlan1"])

            wificonnected = subprocess.check_output(["nmcli","-f","GENERAL.STATE","con","show",wifissid])
        except subprocess.CalledProcessError:
            return False
        
               

    return True
        