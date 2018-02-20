var data = require('../data.json');
var userData = require('../userData.json');
var categoryList = require('../categoryListData.json');

exports.view = function(req, res){
    var loginStatus = userData.loginStatus;

    console.log("User is loggeed in: "+loginStatus);

    if (!loginStatus) { //not logged in; show pop up
    	res.render('profile_popup');
    }
    else {				//logged in; show profile page
    	res.render('profile', userData);
    }

};

exports.register = function(req, res) {
	console.log("register");
	var newUser =
	{
      "name": req.query.name,
      "email": req.query.email,
      "password": req.query.password,
      "username": req.query.username
	};
  //TODO: need to fix here. userdata should push into wholeUserData Json.
	//userData.userList.push(newUser);
	userData.loginStatus = true;
	userData.userName = req.query.name;
	console.log("login status: "+userData.loginStatus);
	res.render('preference', {
    userData,
    categoryList
  });
};
