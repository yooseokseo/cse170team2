var socket = io.connect('http://localhost:3000');

//gets loginStatus directly from app.js to avoid asynchronicity shit
socket.once('loginStatus', function(signedIn)
{
  if (!signedIn) 
  {
    $(".profile").attr({
      "data-toggle": "modal",
      "data-target": "#profile_popup",
    });
  }

  $(".profile").attr("href", "/profile");    
});



function addMediaHTML()
{
	socket.emit('addMediaHTML');
}