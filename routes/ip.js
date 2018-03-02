var http = require('http');
var userIP = require('../userIP.json');
var userData = require('../userData.json');
var defaultUserData = require('../defaultUserData.json');
var ipAddress, ipIndex;


http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) 
{
  resp.on('data', function(ip) 
  {
    console.log("ip = "+ip);
    ipAddress = ip;
  });
});

exports.getIP = function()
{
  return ipAddress;
}

exports.getIPIndex = function()
{
  return ipIndex;
}

exports.getUserData = function()
{
  var i, ipIndex;
  for (i = 0; i < userIP.length; i++)
  {
    if (ipAddress == userIP[i].ip)
    {
      console.log("user ip in system");
      ipIndex = i;
      return userData[ipIndex];
    }
  }

  ipIndex = userIP.length; 
  userIP.push( {"ip": ipAddress} ); //store IP
  var newUserData = JSON.parse(JSON.stringify(defaultUserData));

  userData.push(newUserData);      //add new userData to the array
  userData[ipIndex].ipIndex = ipIndex;


  return userData[ipIndex];

}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};