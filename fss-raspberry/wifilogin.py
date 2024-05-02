import wifi
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
            wifi_networks = wifi.Cell.all('wlan1')
            for wifi_net in wifi_networks:
                
                if wifi_net.ssid == wifissid:
                    try:
                        subprocess.check_output(["nmcli", "dev", "wifi", "connect", wifissid, "password", wifipass])

                        wificonnected = subprocess.check_output(["nmcli","-f","GENERAL.STATE","con","show",wifissid])
                    except subprocess.CalledProcessError:
                        return False
        
                else:
                    return False
        except wifi.exceptions.InterfaceError:
            pass
    return True
        