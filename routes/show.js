var userData = require('../userData.json');
var data = require('../data.json');
var categoryList = require('../categoryListData.json');


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
  var categoryListUser = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if(index-1 <0){
    index = 0;
  }
  switch (categoryListUser[index-1].type) {
    case 'image':
        console.log('image Type');
        mediaHTML = '<img id="media" src="'+categoryListUser[index-1].URL+'" alt="">';
        break;
    case 'video':
          console.log('video Type');
          mediaHTML = '<video style="width:100%;" controls><source src='+ categoryListUser[index-1].URL+' type=video/mp4></video>';
          break;

    default:
        console.log('check mediaType!');
        break;
  }

  console.log('categoryTitle: '+ categoryTitle);

  res.render('play',{
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId' : itemId,
    'itemTitle' : categoryListUser[index-1].itemTitle,
    'caption': categoryListUser[index-1].caption,
    'itemID': categoryListUser[index-1].id,
    'isScreenShared' : userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus
  });
};
