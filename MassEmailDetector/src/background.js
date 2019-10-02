// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
    // "sample_setting": "This is how you use Store.js to remember values"
// });
//IGNORE ABOVE FOR NOW *******************************************


//Fired when the extension is first installed,
// when the extension is updated to a new version,
//and when Chrome is updated to a new version.
 chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({active: false}, function() {
      console.log("active set to false");
    });

    //Tells background script to only run on gmail
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
          chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {urlContains: 'mail.google'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
          }]);
        });
  });

/*
  // When the user clicks the browser-action button... WONT WORK CURRENTLY
    - Cant have both popup and js running from here

  chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('browserActon clicked');
      // ...inject 'jquery.min.js' and...
    //  chrome.tabs.executeScript(tab.id, {
      //    file: "js/jquery.min.js",
          //allFrames: true,
          //runAt: "document_idle"
    //  });
      // ...inject 'content.js' into the active tab's page
      //chrome.tabs.executeScript(tab.id, {
          //file: "js/content.js",
          //allFrames: true,
          //runAt: "document_idle"
    //  });
      chrome.tabs.executeScript(tab.id, {
          file: "js/browser_action.js",
          allFrames: true,
          runAt: "document_idle"
      });
  });
  */
