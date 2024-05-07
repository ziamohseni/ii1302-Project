import requests

def sendNotification(title,body,token):
    headers={"Content-Type":"application/json"}
    data = {
    "to": "ExponentPushToken["+token+"]",
    "title":title,
    "body": body
    }
    requests.post(url="https://exp.host/--/api/v2/push/send",headers=headers,data=data)
