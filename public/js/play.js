'use strict';
var isUp = false;

$(document).ready(function() {


});

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


//for like and bookmark buttons
//use socket in order to add item to json without reloading page
var socket = io.connect('http://localhost:3000');
function bookmark(itemID)
{
  socket.emit('bookmark', itemID); 

  socket.on('bookmarkSuccess', function()
  {
    $('.bookmark-popup').fadeIn(500);
    $('.bookmark-popup').fadeOut(2000);
  });

  socket.on('bookmarkFail', function()
  {
    alert("Please log in or sign up to bookmark");
  });

    
  
}

function like(itemID)
{
  alert("id = "+itemID);
  if (!loginStatus) //not logged in; can't like
  {
    alert("Please log in or sign up to like");
  }
  else
  {
    console.log('like clicked');
    $(this).fadeOut(300);
    $('#like-heart').fadeIn(300);
  }
}
