var data = require('../data.json');
var userData = require('../userData.json');

//return true if successfully bookmarked (user logged in);
//false otherwise (not logged in)
exports.like = function(itemID)
{
	console.log("in routes/like");

	if (userData.loginStatus)
	{
		userData.likedList.push(data[itemID]);

		return true;
	}

	console.log("not logged in; cannot like");
	return false;
}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};