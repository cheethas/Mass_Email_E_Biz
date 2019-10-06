console.log("running browser_action.js");

//none of below work. -> why?
document.addEventListener("DOMContentLoaded", function() {
    restore_options();
    console.log("options restored");
    // event listener for the button inside popup window
    document.getElementById('onOff').addEventListener('click', save_options);
});

// Saves options to chrome.storage
function save_options() {
  console.log('save options : running');
  var onOffOption = document.getElementById("onOff").checked;
  console.log('save options : checked var recieved');
  chrome.storage.sync.set({
    active: onOffOption,
  });
  console.log('save options : sync storage set');
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    active: 'onOffOption',
  }, function(items) {
    document.getElementById('onOffOption').value = items.onOffOption;
  });
}

document.addEventListener('DOMContentLoaded', function(){
  restore_options();
  console.log('options restored');
});
