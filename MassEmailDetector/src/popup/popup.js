//document.addEventListener('click', () => alert('click'));

var console = chrome.extension.getBackgroundPage().console;

var app = {

  init: function(){

    //cache some element refS
    var stateOfCheckBox = document.getElementById("onOff");

    //get state of checkbox  when loading
    chrome.runtime.sendMessage({fn: "getStateOfCheckBox"}, function(response){
      stateOfCheckBox.checked = response;
    });

    stateOfCheckBox.addEventListener("click",function(){
      chrome.runtime.sendMessage({fn: "setStateOfCheckBox" ,stateOfCheckBox: stateOfCheckBox.checked});
    });
  }
};

//startup
document.addEventListener("DOMContentLoaded",function(){
  app.init();
});
