import requests

def sendNotification(title,body,token,category):
    headers={"Content-Type":"application/json"}
    data = {
    "to": "ExponentPushToken["+token+"]",
    "sound":"default",
    "title":title,
    "body": body,
    "categoryId":category
    }
    requests.post(url="https://exp.host/--/api/v2/push/send",headers=headers,data=data)
