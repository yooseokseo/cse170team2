function getIP (){
    $.getJSON("http://jsonip.com/?callback=?", function (data) {
    	socket.emit('getIP', data.ip);

    });
};