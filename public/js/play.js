'use strict';
var isUp = false;

$('#up-btn').click(function() {

  if (isUp) {
    isUp = false;
    console.log('it was Up so it should down');
    $('.message-window').animate({
      height: "7rem"
    });

    $('#up-icon').animate({
      borderSpacing: 0
    }, {
      step: function(now, fx) {
        $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
        $(this).css('transform', 'rotate(' + now + 'deg)');
      },
      duration: 'slow'
    }, 'linear');
  } else {
    isUp = true;
    console.log('it was Down so it should Up');
    $('.message-window').animate({
      height: "36rem"
    });
    $('#up-icon').animate({
      borderSpacing: -180
    }, {
      step: function(now, fx) {
        $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
        $(this).css('transform', 'rotate(' + now + 'deg)');
      },
      duration: 'slow'
    }, 'linear');

  }



})

$('#moreBtn').click(function() {
  $('#page-media-title').toggle();
  $('#page-madia-caption').toggle("slow");
});

$(document).ready(function() 
{
});




function check(itemID)
{
  checkBookmark(itemID);
  checkLike(itemID);
}

//check if item already bookmarked; show bookmarked icon if so
function checkBookmark(itemID)
{
  socket.emit('checkBookmark', itemID);
  socket.once('bookmarked', function()
  {
    $('#bookmark-lable').hide();
    $('#bookmark-icon').show();
  });

  socket.once('notBookmarked', function()
  {
    $('#bookmark-lable').show();
    $('#bookmark-icon').hide();
  })
}

//check if item alerady liked; show like heart if so
function checkLike(itemID)
{
  socket.emit('checkLike', itemID);
  socket.once('liked', function()
  {
    $('#like-lable').hide();
    $('#like-heart').show();
  });

  socket.once('notLiked', function()
  {
    $('#like-lable').show();
    $('#like-heart').hide();
  })
}

//for like and bookmark buttons
//use socket in order to add item to json without reloading page
function bookmark(itemID)
{
  socket.emit('bookmark', itemID); 

  socket.once('bookmarkSuccess', function()
  {
    console.log("show bookmark popup");
    $('.bookmark-popup').fadeIn(500);
    $('.bookmark-popup').fadeOut(2000);

    $('#bookmark-lable').fadeOut(300);
    $('#bookmark-icon').fadeIn(300);
  });

  socket.once('bookmarkFail', function()
  {
    //alert("Please log in or sign up to bookmark");
    console.log("show bookmark popup");

    $('.bookmark-fail-popup').fadeIn(250);
    $('.bookmark-fail-popup').fadeOut(3000);
  }); 
}

function like(itemID)
{
  socket.emit('like', itemID); 

  socket.once('likeSuccess', function()
  {
    $('#like-lable').fadeOut(300);
    $('#like-heart').fadeIn(300);
  });

  socket.once('likeFail', function()
  {
    //alert("Please log in or sign up to like");
    $('.like-fail-popup').fadeIn(250);
    $('.like-fail-popup').fadeOut(3000);
  }); 
}
