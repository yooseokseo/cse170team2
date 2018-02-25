'use strict';
var isUp = false;

$(document).ready(function() {


});

function bookmark(loginStatus)
{
  if (!loginStatus) // not logged in; can't save
  {
    alert("Please log in or sign up to bookmark");
  }
  else
  {
    $('.bookmark-popup').fadeIn(500);
    $('.bookmark-popup').fadeOut(2000);
  }
}

function like(loginStatus)
{
  if (!loginStatus)
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
