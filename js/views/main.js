var RecentImages = require('../collections/recent-images.js');
var PhotosView = require('./photos');
var _ = require('underscore');
var $ = require('jquery');

module.exports = PhotosView.extend({
  initialize: function() {
    this.load();

    this.render();

    var nav = '<button class="refresh">Refresh</button>'
    this.navigation.html(nav);
  },
  render: function() {
    var self = this;

    var recent = new RecentImages();

    recent.getFirstPage({
      success: function(photos) {
        self.collection = recent;
        self.insertPhotos(photos);
      }
    });
  },
  events: function() {
    return _.extend({}, PhotosView.prototype.events, {
      'click .refresh': 'refresh'
    });
  },
  refresh: function() {
    var self = this;

    $('.loading__progress').val(0);
    $('.loading').fadeIn('slow', function () {
      self.render();
    });
  }
});
