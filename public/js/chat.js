var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
  socket.emit('addUser', 'user');

});
socket.on('updateChat', function(username, data) {
  $('#conversation').append('<b>' + username + ':</b>' + data + '<br>');
});





$(function() {

  $('#datasend').click(function() {
    console.log('#datasend clicked');
    var message = $('#chat-input').val();
    $('#chat-input').val('');
    $('#chat-input').focus();

    socket.emit('sendChat', message);
  });
  $('#chat-input').keypress(function(e) {
    console.log('ketpree');
    if (e.which == 13) {
      $(this).blur();
      $('#datasend').focus().click();
      //$('#chat-input').focus();
    }
  })

})
