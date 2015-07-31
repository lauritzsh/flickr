var SearchImages = require('../collections/search-images');
var PhotosView = require('./photos');
var $ = require('jquery');

module.exports = PhotosView.extend({
  render: function() {
    var self = this;

    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = position.coords;

      var search = new SearchImages(null, {
        queryParams: {
          lat: coords.latitude,
          lon: coords.longitude
        }
      });

      search.getPage(self.page, {
        success: function(photos) {
          window.x = photos.models[0];
          self.collection = search;
          self.insertPhotos(photos);
        }
      });
    }, function(err) {
      self.insertPhotos(null);
    });
  }
});
