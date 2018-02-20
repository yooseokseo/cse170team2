//database
var userData = require('../userData.json');
var popularCategoryList = require('../popularCategoryListData.json');
var categoryList = require('../categoryListData.json');
//variables
var loginStatus = userData.loginStatus;


//set current page = home
userData.currentPageViewed ="home";




//check a user is logged in or not
if (loginStatus) {
  //a returning user
  console.log('you are logged in already');
  //favorite categotyList should be shown
  var favoriteList = userData.favoriteList;
  console.log(favoriteList);
  //update currentCategorySelected to print "Favorite" text
  userData.currentCategorySelected = "Favorite";
  // copy 4 most favorite categories
  // from favoriteList to userList in userData.json
  for (var i = 0; i < 4; i++) {
    userData.userList.push(favoriteList[i]);
  }
}
else {
  //a new user
  console.log('you are not logged in yet');
  //popular categoryList should be shown

  //update currentCategorySelected to print "Popular" text
  userData.currentCategorySelected = "Popular";

  // copy 4 most popular categories
  // from popularCategoryList to userList in userData.json
  for (var i = 0; i < 4; i++) {
    userData.userList.push(popularCategoryList[i]);
  }

}
var userList = userData.userList;


exports.view = function(req, res){
  userData.currentItemIndex = 0;
  res.render('index', {
    'currentCategorySelected': userData.currentCategorySelected,
    'currentUserCategoryList': userList,
    'loginStatus': userData.loginStatus,
    categoryList
  });
};
