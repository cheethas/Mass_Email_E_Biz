import hashlib
import re
import requests
import json

API_URL = "http://127.0.0.1:8000"

#get user input from console
def getUserInput():
    return input("Enter a string to hash")

#hash the passed in text returning a hexdigest of md5
def hashText(passedText):
    hashObject = hashlib.md5(passedText.encode('utf-8')).hexdigest()
    return hashObject

#open the file in read mode
def getFileText(filename):
    fileObj = open(filename, "r")
    return fileObj.read()

#remove all whitespce from the document
def removeWhiteSpace(textFile: str):
    return textFile.replace(" ", "")

#Find all nouns in the file and remove them
def removeNouns(textFile: str):
    #find locations of all capital letters in the text
    returnString = textFile

    #look for all captial letters at the start of sentences
    words = re.findall("(?<!^)(?<!\. )[A-Z][a-z]+", returnString)
    print(words)
    
    for x in words:
        #wordIndex = textFile.find
        #length = x.length
        returnString = returnString.replace(x, '')


    return returnString

#works
def doesHashExist(hashString: str):
    try:
        hashReq = requests.get(API_URL + "/api/hashes/" + hashString)
        #if not found returned
        if (hashReq.status_code == 404):
            print("Bad request 404 received")
            return False

        returnedJson = hashReq.json()
        returnedHashString = returnedJson["hashValue"]

        #return true if the returned string and passed in string are equal to eachother
        return (returnedHashString == hashString)
        
    except:
        return False
    
#works
def addHashToDB(hashString: str):
    try:
        jsonObj = {"hashValue": hashString}
        print(jsonObj)
        hashReq = requests.post(API_URL + "/api/hashes/", data=jsonObj)

        if (hashReq.status_code == 201):
            return True
        else:
            print("Adding new hash failed")
            print(hashReq.status_code)
            return False
    except:
        print("Adding new hash failed")
        return False

#updates the count for a string
def updateHashCount(hashString: str):
    try:
        hashReq = requests.get(API_URL + "/api/hashes/" + hashString)
        #if not found returned
        if (hashReq.status_code == 404):
            print("Bad request 404 received")
            return False

        returnedJson = hashReq.json()
        returnedHashString = returnedJson["hashValue"]
        #if the returned JSON already exists, add the count then update the counter in the db

        if (returnedHashString == hashString):
            print("Strings matched")
            #NOTE GETS TO HERE
            
            returnedCounter = returnedJson["count"]
            newCounter = returnedCounter+1

            #create the updated object
            jsonObj = {"hashValue": hashString, "count": newCounter}
            #update the server
            
            hashReq = requests.put(API_URL + "/api/hashes/" + hashString + "/", data=jsonObj)
            if (hashReq.status_code==200):
                #hash count updated successfully
                print("Hash count updated successfully")
                return True
            else:
                print("Update failed")
                return False
        else:
            print("Update failed")
            return False
    except:
        return False
            
      

#mainline
if __name__ == "__main__":
    
    #update a hash count in a db
    print(updateHashCount("test"))

    """
    #test adding a new hash to the api
    print(addHashToDB("test"))
    """

    """
    #for checking if a hash exists in the db
    #unsuccessful request
    print(doesHashExist("dsajdh"))
    print("")
    #successful request
    print(doesHashExist("agdhsjadyeuuw7823"))
    """

    #testing hashing algorithm
    """
    email1 = getFileText("email1.txt")
    email2 = getFileText("email2.txt")

    email1hash = hashText(removeWhiteSpace(removeNouns(email1)))
    email2hash = hashText(removeWhiteSpace(removeNouns(email2)))

    print(email1hash == email2hash)
    print(email1hash)
    print(email2hash)
    """


    

#FURTHER ADVANCEMENT
#FIND A WAY FOR IT TO ALLOW NAMES AT THE START OF SENTENCES



#CODE TO FIND THE WORDS IN A PHRASE THAT ARE CAPITAL LETTERS AT THE START OF A SENTENCE
#import re
#mystr="This is a Test sentence. The sentence is Supposed to Ignore the Words at the beginning of the Sentence."
##
#print(re.findall(r'(?<!^)(?<!\. )[A-Z][a-z]+',mystr))
#
