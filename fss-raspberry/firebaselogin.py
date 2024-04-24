import fssfirebase
def getFirebase():
    with open("user.txt","r") as userfile:
        username = userfile.readline().split(":")[1].split("\n")[0]
        password = userfile.readline().split(":")[1].split("\n")[0]

    firebase = fssfirebase.FssFirebase(username,password)
    return firebase