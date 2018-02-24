module.exports = {
    testFunction,
    otherFunction: function() {

    }
}

function testFunction(name, message) {
        console.log(name + ' is speaking to me! They\'re saying: ' + message);

        console.log('in test.js! '+name+' called app.js')

        if (name != 'hello')
        {
        	return 'userName is wrong'
        }
    }