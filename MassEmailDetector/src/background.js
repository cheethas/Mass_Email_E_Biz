//TO do
//  Save data to chrome, don't just persist across background
//
console.log("Background running");

var background = {

  sender: {},
  body:{},
  url: "seansDB",

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
    this.sender = request.sender;
  },

  setBody: function(request,sender,sendResponse){
    console.log("body:", request.sender);
    this.body = request.sender;


  },

  calcData: function(request,sender,sendResponse){
    var peopleWhoGotEmail = 10;
    console.log("people who got email: " + peopleWhoGotEmail);
  },

  mainF: function mainF(){
    var joinEmailAndBody = this.sender + this.body;
    var joinedStringWihoutNouns = removeNouns(joinEmailAndBody);
    var noNounsOrWhiteSpace = removeWhiteSpace(joinedStringWihoutNouns);
    var hash = hashFunction(stringToHash);
    var urlPlusHash = this.url + "/" + hash;

    //get number of hashes using hash from server
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET",urlPlusHash,false);
    xmlHttp.send(null);
    var response = xmlHttp.responseText; //could send this +1 back to user
    
    //add 1 to number and hash and post

    //send message to content script to alert
  }

}
background.init();

function hashFunction(stringToHash){
  //SEANS HASH function

  var result = "HFGD6353BDNND";
  return result;
}
