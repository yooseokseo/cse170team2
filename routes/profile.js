var data = require('../data.json');
var userData = require('../userData.json');
var categoryList = require('../categoryListData.json');
var wholeUserData = require('../wholeUserData.json');
var dataTypeList = require('../dataType.json');


//-----------------------------------------------
//---------------------VIEW()--------------------
//-----------------------------------------------
exports.view = function(req, res) {
  var loginStatus = userData.loginStatus;

  console.log("User is loggeed in: " + loginStatus);

  if (!loginStatus) { //not logged in; show pop up
    res.render('profile_popup');
  } else { //logged in; show profile page
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

//------------------------------------------------
//-------------------REGISTER()-------------------
//------------------------------------------------
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
  var newUser = {
    "loginStatus": false,
    "userRole":null,
    "userIdNumber": id,
    "userName": userName,
    "password": password,
    "email": email,
    "profileImgURL": img,
    "actualName": actualName,
    "currentItemIndex": 0,
    "isScreenShared": false,
    "isAtChatroom": false,
    "categoryList": [],
    "favoriteList": [{
      "title": "Activities",
      "id": "activities"
    }, {
      "title": "Food",
      "id": "food"
    }, {
      "title": "Travel",
      "id": "travel"
    }, {
      "title": "Movies",
      "id": "movies"
    }, {
      "title": "Pets",
      "id": "pets"
    }, {
      "title": "Home",
      "id": "home"
    }]
  }

  return newUser;
}

//helper function to populate userData after new user/existing user logs in
//sets userData to values from wholeUserData
function populateUserData(userIdNumber) {
  userData.userIdNumber = userIdNumber;
  userData.userName = wholeUserData[userIdNumber].userName;
  userData.actualName = wholeUserData[userIdNumber].actualName;
  userData.currentItemIndex = wholeUserData[userIdNumber].currentItemIndex;
  userData.isScreenShared = wholeUserData[userIdNumber].isScreenShared;
  userData.categoryList = wholeUserData[userIdNumber].categoryList;
  userData.favoriteList = wholeUserData[userIdNumber].favoriteList;
  userData.profileImgURL = wholeUserData[userIdNumber].profileImgURL;
  userData.isAtChatroom =  wholeUserData[userIdNumber].isAtChatroom;
  userData.loginStatus = true;
}

//helper function to populate wholeUserData after user logs out
//stores current userData to wholeUserData and replace userData w/ default data
function resetUserData(userIdNumber) {
  //populate wholeUserData with current userData
  wholeUserData[userIdNumber].currentItemIndex = userData.currentItemIndex;
  wholeUserData[userIdNumber].isScreenShared = userData.isScreenShared;
  wholeUserData[userIdNumber].categoryList = userData.categoryList;
  wholeUserData[userIdNumber].favoriteList = userData.favoriteList;
  userData.loginStatus = false;

  //replace userData w/ default data
  userData = wholeUserData[0];

  console.log(userData);
}


//-----------------------------------------------
//----------------/PROFILE_LOGOUT----------------
//-----------------------------------------------
exports.logout = function(req, res) {
  resetUserData(userData.userIdNumber);

  //Code copied from index.js
  var popularCategoryList = require('../popularCategoryListData.json');
  userData.currentCategorySelected = "Popular";

  userData.userList = [];
  for (var i = 0; i < 4; i++) {
    userData.userList.push(popularCategoryList[i]);
  }

  var userList = userData.userList;
  res.render('index', {
    'currentCategorySelected': userData.currentCategorySelected,
    'currentUserCategoryList': userList,
    'loginStatus': userData.loginStatus,
    categoryList,
    userData,
    'dataTypeList': dataTypeList
  });

};
