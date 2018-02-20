//database
var userData = require('../userData.json');
var popularCategoryList = require('../popularCategoryListData.json');
var categoryList = require('../categoryListData.json');
var loginStatus = userData.loginStatus;


//set current page = home
userData.currentPageViewed ="home";



var userList = userData.userList;

exports.view = function(req, res){
  userData.currentItemIndex = 0;
  res.render('browse', {
  	categoryList,
    'currentCategorySelected': userData.currentCategorySelected,
    'currentUserCategoryList': userList,
    'loginStatus': userData.loginStatus,
  });
};
