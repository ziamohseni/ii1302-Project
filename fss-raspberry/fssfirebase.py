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

            


    def fbset(self,path,data):
        self.db.child(path).set(data,self.loginret["idToken"])

    def fbget(self,path):
        entries = self.db.child(path).get(self.loginret["idToken"]).each()
        dictionary = {}
        try:
            for entry in entries:
                dictionary[entry.key()] = entry.val()
        except TypeError:
            pass

        return dictionary
    def fbstream(self,path,streamHandler):
        return self.db.child(path).stream(streamHandler,self.loginret["idToken"])





