var data = require('../data.json');
var userData = require('../userData.json');
var categoryList = require('../categoryListData.json');
var wholeUserData = require('../wholeUserData.json');
var dataTypeList = require('../dataType.json');
var userIP = require('../userIP.json');

function addMediaHTML(){};

//-----------------------------------------------
//---------------------VIEW()--------------------
//-----------------------------------------------
exports.view = function(req, res) {
  var loginStatus = userData.loginStatus;

  console.log("User is loggeed in: " + loginStatus);

  if (!loginStatus) //not logged in; show pop up 
  { 
    res.render('profile_popup');
  } 
  else //logged in; show profile page
  { 
    addMediaHTML();
      res.render('profile', userData);  
  }

  

};


//return userIdNumber if user exists; -1 otherwise
exports.existingUser = function(email, password, checkPassword)
{
  for (var i = 0; i < wholeUserData.length; i++) 
  {
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
  //user doesn't exist; register user with provided info
  var id = wholeUserData.length;
  var newUser = createNewUser(id, userName, password, email, img, actualName);

  wholeUserData.push(newUser);
  populateUserData(id); 
}



//helper function to create new users
function createNewUser(id, userName, password, email, img, actualName) {
  var newUser = require('../defaultUserData.json');
  delete userData['currentPageViewed'];
  delete userData['currentCategorySelected'];
  delete userData['loginStatus'];
  newUser.userIdNumber = id;
  newUser.userName = userName;
  newUser.password = password;
  newUser.profileImgURL = img;
  newUser.actualName = actualName;
  return newUser;
}

//helper function to populate userData after new user/existing user logs in
//sets userData to values from wholeUserData
function populateUserData(userIdNumber) {
  userData = wholeUserData[userIdNumber];
  userData["currentPageViewed"] = null;
  userData["currentCategorySelected"] = null;
  userData["loginStatus"] = true;
}

exports.logout = function()
{
  delete userData['currentPageViewed'];
  delete userData['currentCategorySelected'];
  delete userData['loginStatus'];
  wholeUserData[userData.userIdNumber] = userData;
  userData = require('../defaultUserData.json');
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

exports.checkIP = function(ip)
{
  var i, ipIndex;
  console.log("in exports.checkIP; ip = "+ip);
  for (i = 0; i < userIP.length; i++)
  {
    if (ip == userIP[i].ip)
    {
      console.log("user ip in system");
      return i;

    }
  }

  var newIP = {"ip": ip};
  userIP.push(newIP);
  console.log(userIP);
  return userIP.length - 1;

}
