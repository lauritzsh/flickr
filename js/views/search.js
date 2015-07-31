var SearchImages = require('../collections/search-images');
var PhotosView = require('./photos');
var $ = require('jquery');

module.exports = PhotosView.extend({
  initialize: function(options) {
    this.query = options.query.replace('-', ' ');
    this.load();
    this.render();
  },
  render: function() {
    var self = this;

    var $search = $('.search');
    if ($search.val() === '') {
      $search.val(this.query);
    }

    var search = new SearchImages(null, {
      queryParams: {
        text: this.query
      },
      state: {
        currentPage: self.page
      }
    });

    search.fetch({
      success: function(photos) {
        self.collection = search;
        self.insertPhotos(photos);
      }
    });
  }
});
