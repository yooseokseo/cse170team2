var ip = require('./ip.js');
//var userData = require('../userData.json');
var userData = ip.getUserData();
var data = require('../data.json');
var categoryList = require('../categoryListData.json');
var wholeUserData = require('../wholeUserData.json');
var dataTypeList = require('../dataType.json');
var userIP = require('../userIP.json');
var defaultUserData = require('../defaultUserData.json');

var ipIndex = userData.ipIndex;

function addMediaHTML(){};

//-----------------------------------------------
//---------------------VIEW()--------------------
//-----------------------------------------------
exports.view = function(req, res) {
  var i;
  for (i = 0; i < wholeUserData.length; i++)
  {
    console.log(wholeUserData[i]);
  }
  var loginStatus = userData.loginStatus;

  console.log("User is loggeed in: " + loginStatus);

  if (!loginStatus) //not logged in; show pop up 
  { 
    res.render('profile_popup');
  } 
  else //logged in; show profile page
  { 
    /*console.log("USER DATA");
    console.log(userData);
    console.log("---");
    console.log("DEFAULT");
    console.log(defaultUserData);
    console.log("---");
    console.log("WHOLE");
    console.log(wholeUserData);
    addMediaHTML();*/
    res.render('profile', userData);  
  }

  

};


//return userIdNumber if user exists; -1 otherwise
exports.existingUser = function(email, password, checkPassword)
{
  for (var i = 0; i < wholeUserData.length; i++) 
  {
    console.log(wholeUserData[i]);
    //user alreay exists
    if (email == wholeUserData[i].email) 
    {
      if (checkPassword && password != wholeUserData[i].password)
      {
        return -1;
      }
      return i;
    }
  }

  return -1; //new user
}

//-----------------------------------------------
//--------------------LOGIN()--------------------
//-----------------------------------------------
//return true if successful login; false otherwise
exports.login = function(email, password, userName, img, actualName)
{
  //check if existing user (matching email and password in database)
  var i;
  if ( (i = this.existingUser(email, password, true)) != -1)
  {
    populateUserData(i);
    return true;
  }

  //-----------------------

  var facebook_google_login = userName != null;

  //not existing user; if Facebook or Google login, create user based on extracted info
  if (facebook_google_login)
  {
    this.register(email, password, userName, img, actualName)

    return true;
  }

  return false; //not existing user and manual login = invalid login info  
}

exports.facebook_google_login = function(email, password, userName, img, actualName)
{
  console.log('facebook_google_login in profile.js');

  var i;
  if ( (i = this.existingUser(email, password, true)) != -1)
  {
    populateUserData(i);
    return true;
  }


  //not existing user; if Facebook or Google login, create user based on extracted info
  this.register(email, password, userName, img, actualName);
  console.log(userData);

  return true;
  

}

exports.register = function(email, password, userName, img, actualName)
{
  var i;
  if ( (i = this.existingUser(email, password, false) != -1) )
  {
    return false;
  }

  //user doesn't exist; register user with provided info
  var id = wholeUserData.length;
  var newUser = createNewUser(id, userName, password, email, img, actualName);

  wholeUserData.push(JSON.parse(JSON.stringify(newUser)));
  populateUserData(id); 

  return true;
}



//helper function to create new users
function createNewUser(id, userName, password, email, img, actualName) {
  var newUser = JSON.parse(JSON.stringify(defaultUserData));


  delete newUser['currentPageViewed'];
  delete newUser['currentCategorySelected'];
  delete newUser['loginStatus'];
  delete newUser['ipIndex']; 
  newUser.userIdNumber = id;
  newUser.userName = userName;
  newUser.password = password;
  newUser.profileImgURL = img;
  newUser.actualName = actualName;
  newUser.email = email;
  return newUser;
}

//helper function to populate userData after new user/existing user logs in
//sets userData to values from wholeUserData
function populateUserData(userIdNumber) {
  userData = JSON.parse(JSON.stringify(wholeUserData[userIdNumber]));
  userData["currentPageViewed"] = null;
  userData["currentCategorySelected"] = null;
  userData["loginStatus"] = true;
  userData["ipIndex"] = ipIndex;
}

exports.logout = function()
{
  /*delete later console.log("LOOOOOOOOOGGGGGGGGGGGG OUTTTTTTTTTTT");
  console.log("defaul");


  console.log("whole user data");
  console.log(wholeUserData[userData.userIdNumber]);
  console.log("----");
  console.log("userData");
  console.log(userData);
    console.log("----");

  console.log("default");
  console.log(defaultUserData); 
    console.log("----");

  console.log("----");

  console.log("----");

  console.log("----");*/


  delete userData['currentPageViewed'];
  delete userData['currentCategorySelected'];
  delete userData['loginStatus'];
  delete userData['ipIndex'];
  //console.log("USER ID NMBER: "+userData.userIdNumber);
  wholeUserData[userData.userIdNumber] = JSON.parse(JSON.stringify(userData));

  var idNum = userData.userIdNumber;


  userData = JSON.parse(JSON.stringify(defaultUserData));
  userData['ipIndex'] = ipIndex;

  /*delete later console.log("whole user data");
  console.log(wholeUserData[idNum]);
  console.log("----");

  console.log("userData");
  console.log(userData);
  console.log("----");

  console.log("default");
  console.log(defaultUserData);*/


};

exports.getUserData = function()
{
  return userData;
}

exports.getWholeUserData = function()
{
  return wholeUserData;
}

exports.getLoginStatus = function()
{
  return userData.loginStatus;
}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};

function addMediaHTML()
{
  console.log("addMediaHTML in routes/profile");
  for (var i = 0; i < userData.bookmarkedList.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.bookmarkedList[i]);
    userData.bookmarkedList[i]['mediaHTML'] = mediaHTML;
  }

  /*
  for (var i = 0; i < user.UPLOADLIST.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.UPLOADLIST[i]);
    userData.UPLOADLIST[i]['mediaHTML'] = mediaHTML
  }

  for (var i = 0; i < user.SHARED.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.SHARED[i]);
    userData.SHARED[i]['mediaHTML'] = mediaHTML
  }
  */
}

function getMediaHTML(item)
{
  var mediaHTML;
  switch(item.type)
  {
    case 'image':
          console.log('image Type');
          mediaHTML = '<img id="mediaHTML" src="'+item.URL+'" alt="">';
          break;
      case 'video':
          console.log('video Type');
          mediaHTML = '<video id="mediaHTML" style="width:100%;" controls><source src='+ item.URL+' type=video/mp4></video>';
          break;
      case 'literature':
          mediaHTML = '<img id="mediaHTML" src="' + item.URL + '" alt="">';
          break;
      case 'music':
        mediaHTML = '<div id="mediaHTML"> <audio id="audio" style="width:70%;" controls><source src="'
                    + item.URL + '" type="audio/ogg">Your browser does not support the audio element.'
                    +'</audio></div>';
        break;
      default:
          console.log('check mediaType!');
          break;
  }

  return mediaHTML;

}
