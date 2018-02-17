var userData = require('../userData.json');
var data = require('../data.json');


exports.view = function(req, res){
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var index = 0;
  var mediaHTML='';

  //find index number from userlist
  var currentUserListLength = userData.categoryList.length;
  console.log('currentUserListLength: ' + currentUserListLength);
  for (var i = 0; i < currentUserListLength; i++) {
    console.log(userData.categoryList[i]);
    console.log(itemId);
    index++;
    if(itemId == userData.categoryList[i].id){
      console.log('index: '+ index);
      break;
    }
  }
  userData.currentItemIndex = index-1;
  var categoryList = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if(index-1 <0){
    index = 0;
  }
  switch (categoryList[index-1].type) {
    case 'image':
        console.log('image Type');
        mediaHTML = '<img id="media" src="'+categoryList[index-1].URL+'" alt="">';
        break;
    case 'video':
          console.log('video Type');
          mediaHTML = '<video style="width:100%;" controls><source src='+ categoryList[index-1].URL+' type=video/mp4></video>';
          break;

    default:
        console.log('check mediaType!');
        break;
  }

  res.render('play',{
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId' : itemId,
    'itemTitle' : categoryList[index-1].itemTitle,
    'caption': categoryList[index-1].caption,
    'itemID': categoryList[index-1].id,
    'isScreenShared' : userData.isScreenShared
  });
};
