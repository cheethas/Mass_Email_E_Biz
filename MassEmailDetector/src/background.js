
var background = {

  init: function(){
    chrome.runtime.onMessage.addListener(function(request,sender,sendresponse){
      console.log("Checked: ", request);
    });
  }
}

//startup
background.init();
