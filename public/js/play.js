'use strict';
var isUp = false;

$(document).ready(function() {


});



$('#up-btn').click(function(){

  if(isUp){
    isUp = false;
    console.log('it was Up so it should down');
    $('.message-window').animate({height: "4rem"});

    $('#up-icon').animate({  borderSpacing: 0 }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','rotate('+now+'deg)');
      $(this).css('-moz-transform','rotate('+now+'deg)');
      $(this).css('transform','rotate('+now+'deg)');
    },
    duration:'slow'
},'linear');
  }
  else {
    isUp = true;
    console.log('it was Down so it should Up');
    $('.message-window').animate({height: "36rem"});
    $('#up-icon').animate({  borderSpacing: -180 }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','rotate('+now+'deg)');
      $(this).css('-moz-transform','rotate('+now+'deg)');
      $(this).css('transform','rotate('+now+'deg)');
    },
    duration:'slow'
  },'linear');

  }



})

$('#moreBtn').click(function() {
    $('#page-media-title').toggle();
    $('#page-madia-caption').toggle("slow");
});