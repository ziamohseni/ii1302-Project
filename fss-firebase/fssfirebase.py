import firebase #pip install firebase-rest-api
import json


class FssFirebase:
    def __init__(self):
        with open("firebaseconfig.json","r") as fcfile: #get the firebase config file here: https://console.firebase.google.com/project/ii1302-5sense/settings/general/web:Njg5MmUwNzctODQyMy00Y2Q5LTlmMzAtZjc5NmIwNGE1NGVl
            firebaseConfig = json.load(fcfile)
            #example of how the firebase config file should look: https://jontek.xyz/examplefirebaseconfig.json

        fireb = firebase.initialize_app(firebaseConfig) 

        auth = fireb.auth()
        self.db = fireb.database()
        with open("deviceNumber.txt","r") as devnumfile:
            self.devNum = devnumfile.readline()


        with open("user.txt","r") as userfile:
            username = userfile.readline().split(":")[1].split("\n")[0]
            password = userfile.readline().split(":")[1].split("\n")[0]


        self.loginret = auth.sign_in_with_email_and_password(username,password)


        self.uid = self.loginret["localId"]

            


    def fbset(self,data):
        self.db.child("devices/"+self.uid+"/"+self.devNum).set(data,self.loginret["idToken"])

    def fbget(self):
        entries = self.db.child("devices/"+self.uid+"/"+self.devNum).get(self.loginret["idToken"]).each()
        dictionary = {}
        for entry in entries:
            dictionary[entry.key()] = entry.val()
        return dictionary
    





