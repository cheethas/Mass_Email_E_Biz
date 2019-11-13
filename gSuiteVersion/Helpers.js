//import 'google-apps-script';
/*
function getReceivedDate(/*
function import 'google-apps-script';
//need to refactor xhr to use URLFETCH service
//eg: var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
me
/*
function getReceivedDate(message) {
  return message.getPlainBody();
}

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

//performs a get request to the response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});

/server for the specific hash
function handleHash(hashString){
  
  var found = false;
  var hashUrl =  "http://127.0.0.1:8000/api/hashes/" + hashString + "/";

  //get number of hashes using hash from server
  var xhr = new XMLHttpRequest();
  xhr.open("GET",hashUrl,true);
  xhr.send(null);
  //the hash already exists in the db
  xhr.onreadystatechange = function (){
    if (xhr.readyState == 4 && xhr.status == 200){
      var response = xhr.responseText; //could send this +1 back to user
      var returnJson = JSON.parse(response);

      console.log("hash = " + returnJson.hashValue.toString() + " count = " + returnJson.count.toString());

      //return the count as the return variable
      response = returnJson.count.toString();

      //make this so that a pop up shows up
      // and so it updates the count
      updateHash(returnJson);


    } else if (xhr.readyState == 4 && xhr.status == 204){
      //means the hash does not exist
      //create a new hash so
      createNewHash(hashString);

    }
  }
  xhr.onerror = function(){
    console.log(xhr.status);
    if (xhr.status == 204){
      console.log(xhr.status);
      found =  false;
    }
  }
  return found;

}
//works i believe ^

//send a post request to the server to add a new hash string
function createNewHash(hashString){

  console.log("passed in : " + hashString);

  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/api/hashes/";
  var newHashData = JSON.stringify({"hashValue" : hashString.toString()});

  console.log(newHashData);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(newHashData);
  //add to the database
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 201){

      //perorm a gt req to check data is successfully in db
      performJustGetReq(hashString.toString());

      return true;
    }
  }
  xhr.onerror = function(){console.log("client 2 had an error"); console.log(xhr.status); return false;}

  return false;

}

//send a post request to the server to add a new hash string
function updateHash(jsonObj){


  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/api/hashes/" + jsonObj.hashValue + "/";

  //increase the val by one
  jsonObj.count = jsonObj.count + 1;
  var updatedObj = JSON.stringify(jsonObj);

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(updatedObj);
  //add to the database
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 204 )){
      var response = xhr.responseText;
      console.log("updated successfully");
      var responseJson = JSON.parse(response);

      console.log("hashVal = " + responseJson.hashValue + "count = " + responseJson.count);


      //performJustGetReq(jsonObj.hashValue);

      return true;
    }
  }
  xhr.onerror = function(){console.log("client 2 had an error"); console.log(xhr.status); return false;}

  return false;

}


function performJustGetReq(hashString){

  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/api/hashes/" + hashString + "/";
  //open connection
  xhr.open("GET", url, true);
  xhr.send(null);

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && (xhr.status == 200)){
      var response = xhr.responseText;
      var responseJson = JSON.parse(response);

      console.log("hashVal = " + responseJson.hashValue + " count = " + responseJson.count);
    }
  }
  xhr.onerror = function() {
    console.log("request failed " + xhr.status);
  }


}


//MD5 function from stackoverflow
MD5 = function(e) {
  function h(a, b) {
      var c, d, e, f, g;
      e = a & 2147483648;
      f = b & 2147483648;
      c = a & 1073741824;
      d = b & 1073741824;
      g = (a & 1073741823) + (b & 1073741823);
      return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
  }

  function k(a, b, c, d, e, f, g) {
      a = h(a, h(h(b & c | ~b & d, e), g));
      return h(a << f | a >>> 32 - f, b)
  }

  function l(a, b, c, d, e, f, g) {
      a = h(a, h(h(b & d | c & ~d, e), g));
      return h(a << f | a >>> 32 - f, b)
  }

  function m(a, b, d, c, e, f, g) {
      a = h(a, h(h(b ^ d ^ c, e), g));
      return h(a << f | a >>> 32 - f, b)
  }

  function n(a, b, d, c, e, f, g) {
      a = h(a, h(h(d ^ (b | ~c), e), g));
      return h(a << f | a >>> 32 - f, b)
  }

  function p(a) {
      var b = "",
          d = "",
          c;
      for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
      return b
  }
  var f = [],
      q, r, s, t, a, b, c, d;
  e = function(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", d = 0; d < a.length; d++) {
          var c = a.charCodeAt(d);
          128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128))
      }
      return b
  }(e);
  f = function(b) {
      var a, c = b.length;
      a = c + 8;
      for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++;
      a = (g - g % 4) / 4;
      e[a] |= 128 << g % 4 * 8;
      e[d - 2] = c << 3;
      e[d - 1] = c >>> 29;
      return e
  }(e);
  a = 1732584193;
  b = 4023233417;
  c = 2562383102;
  d = 271733878;
  ssage) {
*/