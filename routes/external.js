//database
var data = require('../data.json');



exports.view = function(req, res){
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var externalId = req.params.externalId;
  var extraInfoLength = data[itemId].extraInfo.length;

  //need to find URL from webURL
  console.log(extraInfoLength);
  console.log(data[itemId].extraInfo[0].container.length);
  console.log(data[itemId].extraInfo[1].container.length);
	res.render('external', {
    'categoryTitle':categoryTitle,
    'itemId':itemId
  });
};
