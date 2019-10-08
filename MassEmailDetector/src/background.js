
var background = {

  stateOfCheckBox: {},

  init: function(){

    //listener for messages and route to functions
    chrome.runtime.onMessage.addListener(function(request,sender,sendresponse){
      if(request.fn in background){
        background[request.fn](request,sender,sendresponse);
      }
    });
  },

  setStateOfCheckBox: function(request,sender,sendResponse){
    console.log("setting state", request.stateOfCheckBox);
    this.stateOfCheckBox = request.stateOfCheckBox;
  },

  getStateOfCheckBox: function(request,sender,sendResponse){
    sendResponse(this.stateOfCheckBox);
  }

}

//startup
background.init();
