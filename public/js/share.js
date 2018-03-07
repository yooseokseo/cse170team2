'use strict';

$(document).ready(function() {

  $('#link-send').click(function(){
    console.log('send');
    $('.save-popup').html('<img id="check-icon" src="/images/icons/check-500.png" alt=""> Sent Link');
    $('.save-popup').fadeIn(500);
    $('.save-popup').fadeOut(2000);
  })
  $('#link-copy').click(function(){
    $('.save-popup').html('<img id="check-icon" src="/images/icons/check-500.png" alt=""> Copied Link');
    $('.save-popup').fadeIn(500);
    $('.save-popup').fadeOut(2000);
  })
  $('#group-chat-send').click(function(){
		console.log('clicked');
		
	});
});
