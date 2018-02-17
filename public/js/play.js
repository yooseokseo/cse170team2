'use strict';

$(document).ready(function() {

  $('#moreBtn').click(function() {
    $('#page-media-title').toggle();
    $('#page-madia-caption').toggle("slow");
  });

  $('#exitSharing').click(function(){
    $('.nav-share').hide();
    $('.nav-container').show();
    $('#back').show();

  });

  $('#enterChatroom').click(function(){
    $('.nav-container').hide();
    $('.nav-share').hide();
    $('.chat-view').removeClass('displayNone');
    $('#exitChatroom').removeClass('displayNone');
    $('#up').removeClass('displayNone');
    $('#back').hide();

  });

  $('#exitChatroom').click(function() {
    $('.chat-view').addClass('displayNone');
    $('.nav-container').show();
    $('#enterChatroom').hide();
    $('#exitSharing').hide();
    $('#exitChatroom').hide();
    $('#up').hide();
    $('.page-media').show();
    $('#nav-cover-top').removeClass('nav-cover-top');
    $('#back').show();
  });



  $('#up').click(function(){
    var btnVal = $(this).text();
    console.log(btnVal);
    if(btnVal === "Down"){
      document.getElementById("myFrame").height = "auto";
      $('.nav-share-2').addClass('ani-shrink');
      $('.chat-view').addClass('ani-shrink-web');
      $('.page-media').show();
      $('#nav-cover-top').removeClass('nav-cover-top');
      $('#up').text('Up');
      $('.nav-share-2').removeClass('ani-expand');
      $('.chat-view').removeClass('ani-expand-web');

    }
    else {
      document.getElementById("myFrame").height = "500";
      $('.chat-view').removeClass('ani-shrink-web');
      $('.nav-share-2').removeClass('ani-shrink');
      $('.page-media').hide();
      $('#nav-cover-top').addClass('nav-cover-top');
      $('#up').text('Down');
      $('.nav-share-2').addClass('ani-expand');

      $('.chat-view').addClass('ani-expand-web');
    }


  //  $('.nav-share-2').animate({
  //    bottom:  "+=30.5rem"
  //  }, 1000, function(){
  //    $('#up').text('Down');
  //  });

  });
});
