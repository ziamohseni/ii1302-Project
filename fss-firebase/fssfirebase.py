import firebase #pip install firebase-rest-api
import json
from requests.exceptions import HTTPError

class InvalidFBLoginInfoError(Exception):
    "Login information incorrect"
    pass

class FssFirebase:
    def __init__(self,email,password):
        with open("firebaseconfig.json","r") as fcfile: 
            firebaseConfig = json.load(fcfile)
           
        fireb = firebase.initialize_app(firebaseConfig) 

        auth = fireb.auth()
        self.db = fireb.database()
        with open("deviceNumber.txt","r") as devnumfile:
            self.devNum = devnumfile.readline()



        try:
            self.loginret = auth.sign_in_with_email_and_password(email,password)
        except HTTPError:
            raise InvalidFBLoginInfoError


        self.uid = self.loginret["localId"]

            


    def fbset(self,data):
        self.db.child("devices/"+self.uid+"/"+self.devNum).set(data,self.loginret["idToken"])

    def fbget(self):
        entries = self.db.child("devices/"+self.uid+"/"+self.devNum).get(self.loginret["idToken"]).each()
        dictionary = {}
        for entry in entries:
            dictionary[entry.key()] = entry.val()
        return dictionary
    def fbstream(self,streamHandler):
        return self.db.child("devices/"+self.uid+"/"+self.devNum).stream(streamHandler,self.loginret["idToken"])





