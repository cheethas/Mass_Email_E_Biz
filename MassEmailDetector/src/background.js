//TO do
//  Save data to chrome, don't just persist across background
//
console.log("Background running");

var background = {

  emailSender: {},
  emailBody:{},
  url: "127.0.0.1/8000",

  init: function(){
    //listener for messages and route to functions
    chrome.runtime.onMessage.addListener(function(request,sender,sendresponse){
      if(request.fn in background){
        background[request.fn](request,sender,sendresponse);
      }
      //console.log(sender);
    });
  },

  setSender: function(request,sender,sendResponse){
    console.log("sender:", request.sender);
    this.emailSender = request.sender;
  },

  setBody: function(request,sender,sendResponse){
    console.log("body:", request.sender);
    this.emailBody = request.sender;


  },

  calcData: function(request,sender,sendResponse){
    var peopleWhoGotEmail = 10;
    console.log("people who got email: " + peopleWhoGotEmail);
  },

  mainF: function mainF(request, sender, sendResponse){
    var joinEmailAndBody = (this.emailSender + this.emailBody).toString();
    var joinedStringWihoutNouns = removeNouns(joinEmailAndBody);
    var noNounsOrWhiteSpace = removeWhiteSpace(joinedStringWihoutNouns.toString());

    //to display the altered string
    console.log(joinEmailAndBody);
    console.log(noNounsOrWhiteSpace);

    
    var hash = hashFunction(stringToHash);
    
    /*
    var urlPlusHash = this.url + "/" + hash;

    //get number of hashes using hash from server
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",urlPlusHash,false);
    xmlHttp.send(null);
    var response = xmlHttp.responseText; //could send this +1 back to user
    
    //add 1 to number and hash and post

    //send message to content script to alert
    */
  }

}
background.init();


//functions to deal with manipulation of email text
function removeNouns(emailBody){
  //declare regex
  var emailBodyRemNouns = emailBody.replace(/(?<!^)(?<!\. )[A-Z][a-z]+/g, "");
  //return the string without the nouns
  return emailBodyRemNouns;
}

function removeWhiteSpace(textString){
  return textString.replace(/ /g, "");
}

function hashFunction(stringToHash){
  //SEANS HASH function

  var result = "HFGD6353BDNND";
  return result;
}
