var data = require('../data.json');
var userData = require('../userData.json');
var categoryList = require('../categoryListData.json');
var wholeUserData = require('../wholeUserData.json');
var dataTypeList = require('../dataType.json');


exports.testLogin = function(username, password)
{
  console.log("TEST_LOGIN in VIEW/PROFILE; username = "+username+"; password = "+password);

  for (var i = 0; i < wholeUserData.length; i++) {
      //existing user (email and password exists in database)
      if (username == wholeUserData[i].email &&
          password == wholeUserData[i].password) {
        
        return true;

      }
    }

    console.log("Wrong username or password!!!!!!!!!!");
    return false;
    

}


//-----------------------------------------------
//-----------------/PROFILE_VIEW-----------------
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

//------------------------------------------------
//----------------/PROFILE_REGISTER---------------
//------------------------------------------------
exports.register = function(req, res) {
  console.log("register");

  var newUser = createNewUser(wholeUserData.length,
    req.query.username,
    req.query.password,
    req.query.email,
    "/images/icons/default_profile.jpg",
    req.query.name);
  wholeUserData.push(newUser);
  populateUserData(newUser.userIdNumber);

  console.log(userData);

  //TODO: need to fix here. userdata should push into wholeUserData Json.
  //userData.userList.push(newUser);
  console.log("login status: " + userData.loginStatus);
  res.render('preference', {
    userData,
    categoryList
  });
};



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
//---------------/PROFILE_FACEBOOK---------------
//-----------------------------------------------
exports.login = function(req, res) {

  //facebook/google login
  if (req.query.fb_gg_username != "") {
    console.log("facebook/google login");

    var newUser = createNewUser(wholeUserData.length,
      req.query.fb_gg_username,
      req.query.exampleInputPassword1,
      req.query.email1,
      req.query.fb_gg_image,
      req.query.fb_gg_name);
    var isNewUser = true;
    var userIdNumber = newUser.userIdNumber;

    for (var i = 0; i < wholeUserData.length; i++) {
      //existing user (email and password exists in database)
      if (newUser.email == wholeUserData[i].email &&
        newUser.password == wholeUserData[i].password) {
        isNewUser = false;
        userIdNumber = i;
      }
    }

    //new user; push newUser to wholeUserData
    if (isNewUser) {
      wholeUserData.push(newUser);
    }

    populateUserData(userIdNumber);

    console.log("userData");
    console.log(userData);

    res.render('profile', userData);
  }

  //manual login
  else {
    console.log("manual login");

    for (var i = 0; i < wholeUserData.length; i++) {
      //existing user (email and password exists in database)
      if (req.query.email1 == wholeUserData[i].email &&
        req.query.exampleInputPassword1 == wholeUserData[i].password) {
        console.log("EXISTING USER");

        populateUserData(i);

        console.log("userData");
        console.log(userData);

        res.render('profile', userData);
      }
    }

    console.log("Wrong username or password");
    //res.render('profile_incorrect_login');

  }
}

exports.incorrect_login = function(req, res) {
  res.render('profile_incorrect_login');
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
