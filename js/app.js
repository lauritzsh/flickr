var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Router = require('./router.js');
var StoreManager = require('./store-manager');
var save = require('./utils/save');

import '../bower_components/normalize.css/normalize.css';
import '../bower_components/fancybox/source/jquery.fancybox.css';
import '../css/site.css';

var router = new Router();
Backbone.history.start();

$('.drop-target').bind('click', save);

var target = $('.drop-target');
target.bind('dragover', function(event) {
  event.preventDefault();
}).bind('drop', function(event) {
  var image = dragSourceElement.attr('href');
  console.log('Adding an image');
  StoreManager.add(image);
});
