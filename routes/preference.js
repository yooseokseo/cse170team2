
var userData = require('../userData.json');
var data = require('../data.json');
var categoryList = require('../categoryListData.json');
console.log("preference.js");

exports.view = function(req, res){
	res.render('preference', {
  "categoryList": categoryList,
  'loginStatus': userData.loginStatus});
  console.log(categoryList);
  console.log(data);
};
