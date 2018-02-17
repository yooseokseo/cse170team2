'use strict';

$(document).ready(function() {
  function toInt(n){ return Math.round(Number(n)); };

  $('#temp-c0').click(function() {
    $('#temp-f0').removeClass('temp-active');
    $('#temp-c0').addClass('temp-active');
    var tempFVal = $('#temp-data0').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data0').text(tempCValInt);
  });

  $('#temp-f0').click(function() {
    $('#temp-c0').removeClass('temp-active');
    $('#temp-f0').addClass('temp-active');
    var tempCVal = $('#temp-data0').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data0').text(tempFValInt);

  });

  $('#temp-c1').click(function() {
    $('#temp-f1').removeClass('temp-active');
    $('#temp-c1').addClass('temp-active');
    var tempFVal = $('#temp-data1').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data1').text(tempCValInt);
  });

  $('#temp-f1').click(function() {
    $('#temp-c1').removeClass('temp-active');
    $('#temp-f1').addClass('temp-active');
    var tempCVal = $('#temp-data1').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data1').text(tempFValInt);
  });


  $('#temp-c2').click(function() {
    $('#temp-f2').removeClass('temp-active');
    $('#temp-c2').addClass('temp-active');
    var tempFVal = $('#temp-data2').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data2').text(tempCValInt);
  });

  $('#temp-f2').click(function() {
    $('#temp-c2').removeClass('temp-active');
    $('#temp-f2').addClass('temp-active');
    var tempCVal = $('#temp-data2').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data2').text(tempFValInt);
  });




})
















function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  document.getElementById("temp-data0").innerHTML = (valNum-32) / 1.8;
}
