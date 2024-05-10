import requests
import time



def saveAndSendToTokens(title,body,tokens,category,firebase):
    for token in tokens:
        sendNotification(title,body,token,category)
    saveNotifHistory(title,body,firebase,category)

def sendNotification(title,body,token,category):
    headers={"Content-Type":"application/json"}
    data = {
    "to": token,
    "sound":"default",
    "title":title,
    "body": body,
    "categoryId":category
    }

    


    requests.post(url="https://exp.host/--/api/v2/push/send",headers=headers,json=data)

def saveNotifHistory(title,body,firebase,category):
    data = {
    "sound":"default",
    "title":title,
    "body": body,
    "categoryId":category,
    "time":time.time()
    }
    notifhist = firebase.fbget("raspberry_hubs/"+firebase.devNum+"/notification_history")
    
    
    if notifhist == {}:
        notifhistlist = []
    else:
        notifhistlist = list(notifhist.values())

    notifhistlist.append(data)
    firebase.fbset("raspberry_hubs/"+firebase.devNum+"/notification_history",notifhistlist)