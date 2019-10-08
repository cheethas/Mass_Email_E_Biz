//document.addEventListener('click', () => alert('click'));

var console = chrome.extension.getBackgroundPage().console;
console.log("content script popup running");

var app = {
  init: function(){
    //cache some element refs
    var stateOfCheckBox = document.getElementById("onOff");

    onOff.addEventListener("click",function(){
      chrome.runtime.sendMessage(stateOfCheckBox.checked);
    })
  }
};

//startup
document.addEventListener("DOMContentLoaded",function(){
  app.init();
});
