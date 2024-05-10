import nmcli
def connectWifi(wifissid,wifipass):
    wifinterface = "wlan1"
    print("Connecting wifi")
    wificonnected = None

    wificonnected = nmcli.device.show(ifname=wifinterface)["GENERAL.CONNECTION"]
    if wifissid == wificonnected:
        return True

    for wifinet in nmcli.device.wifi(ifname=wifinterface,rescan=True):
        if wifissid == wifinet.ssid:
            while wifissid != wificonnected:
        
                try:
                    nmcli.device.wifi_connect(ssid=wifissid,password=wifipass,ifname=wifinterface)

                    wificonnected = nmcli.device.show(ifname=wifinterface)["GENERAL.CONNECTION"]
                except (nmcli._exception.ConnectionActivateFailedException,nmcli._exception.NotExistException):
                    return False
            
                

    return True
        