import hashlib
import re

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

#mainline
if __name__ == "__main__":
    
    email1 = getFileText("email1.txt")
    email2 = getFileText("email2.txt")

    email1hash = hashText(removeWhiteSpace(removeNouns(email1)))
    email2hash = hashText(removeWhiteSpace(removeNouns(email2)))

    print(email1hash == email2hash)
    print(email1hash)
    print(email2hash)


    

#FURTHER ADVANCEMENT
#FIND A WAY FOR IT TO ALLOW NAMES AT THE START OF SENTENCES



#CODE TO FIND THE WORDS IN A PHRASE THAT ARE CAPITAL LETTERS AT THE START OF A SENTENCE
#import re
#mystr="This is a Test sentence. The sentence is Supposed to Ignore the Words at the beginning of the Sentence."
##
#print(re.findall(r'(?<!^)(?<!\. )[A-Z][a-z]+',mystr))
#
