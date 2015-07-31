var $ = require('jquery');
var _ = require('underscore');
var download = require('./download');
var StoreManager = require('../store-manager');
var JSZip = require('jszip');
var saveAs = require('filesaver.js');

module.exports = function save() {
  $('.drop-target').unbind('click', save);
  var photos = StoreManager.get();

  if (photos.length) {
    $('.drop-target').addClass('rotate');
    var image = 1;
    var zip = new JSZip();
    _.each(photos, function(photo) {
      download(photo, function(err, data) {
        console.log('Got image: ' + image);
        zip.file('image' + image + '.jpg', data);

        if (image++ === photos.length) {
          console.log('Saving');
          var blob = zip.generate({type: 'blob'});
          saveAs(blob, 'images.zip');

          StoreManager.clear();

          $('.drop-target').removeClass('rotate');
          $('.drop-target').bind('click', save);
        }
      });
    });
  } else {
    alert('No images saved yet!');
    $('.drop-target').bind('click', save);
  }
};
