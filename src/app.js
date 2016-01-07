/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');


var ntTitle = new UI.Card({
  title: 'Neues Testament',
  subtitle: 'Error',
  body: '',
  titleColor: 'blue',
  fullscreen: true,
  scrollable: true,
  style: 'small',
});

var atTitle = new UI.Card({
  title: 'Altes Testament',
  subtitle: 'Error',
  body: '',
  titleColor: 'blue',
  fullscreen: true,
  scrollable: true,
  style: 'small',
});

var splash = new UI.Card({
  title: 'Devotionalium',
  subtitle: 'Die Bibel für jeden Tag',
  body: 'Von Max Melzer',
  titleColor: 'blue',
  bodyColor: 'grey',
});

splash.show();
ajax(
  {
    url: 'http://devotionalium.moehrenzahn.de/api/',
    type: 'json'
  },
  function(data, status, request) {
    ntTitle.subtitle(data.ntverse);
    ntTitle.body(data.nttext + "\n\n");
    atTitle.subtitle(data.atverse);
    atTitle.body(data.attext + "\n\n");
    
    splash.hide();
    ntTitle.show();
  },
  function(error, status, request) {
    var errorCard = new UI.Card({
  title: 'Error',
  subtitle: 'Failed to Download Verses',
  body: 'Please try again later.',
  titleColor: 'red',
  subtitleColor: 'red',
  bodyColor: 'grey',
    });
    splash.hide();
    errorCard.show();
  }
);

     
ntTitle.on('click', 'select', function(e) {
  ntTitle.hide();
  atTitle.show();
});

atTitle.on('click', 'back', function(e) {
  atTitle.hide();
  ntTitle.show();
});