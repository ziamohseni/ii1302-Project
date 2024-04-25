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
        self.storage = fireb.storage()
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



#Only requires user - credentials : 

    def fbput(self,path, filename):
        self.storage.child(path).put(filename, self.loginret["idToken"])
    def fbdownload(self,path,filename):
        self.storage.child(path).download(filename, self.loginret["idToken"])
    def fbstorageurl(self,path):
        return self.storage.child(path).get_url(self.loginret["idToken"])

# Delete Function :  
    def fbstoragedelete(self,path):
        self.storage.child(path).delete(self.loginret["idToken"])
