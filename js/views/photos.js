var StoreManager = require('../store-manager');
var SearchImages = require('../collections/search-images.js');
var _ = require('underscore');
var $ = require('jquery');
var imagesLoaded = require('imagesloaded');
require('fancybox')($);

module.exports = Backbone.View.extend({
  el: '#main',
  photos: $('.photos'),
  navigation: $('.main__nav'),
  page: 1,
  collection: null,
  load: function() {
    this.navigation.html('');

    $('.fancybox').fancybox({
      openEffect: 'none',
      closeEffect: 'none'
    });

    $('.loading__progress').val(0);
    $('.loading').css({
      top:    this.photos.offset().top,
      width:  this.photos.outerWidth(),
      height: this.photos.outerHeight()
    });

    $('.loading').show();

    var nav = '<button disabled class="prev">Previous</button><button class="next">Next</button>'
    this.navigation.html(nav);
  },
  initialize: function() {
    this.load();
    this.render();
  },
  events: {
    'keypress .search': 'search',
    'click .prev': 'prev',
    'click .next': 'next'
  },
  search: function(event) {
    if (event.which === 13) {
      var query = event.currentTarget.value.replace(/'/g, '').replace(/\W+/g, '-');
      Backbone.history.navigate('#/search/' + query);
    }
  },
  prev: function() {
    var self = this;

    if (this.collection.hasPreviousPage()) {
      this.page--;
      this.newPage();
    }
  },
  next: function() {
    var self = this;

    if (this.collection.hasNextPage()) {
      this.page++;
      this.newPage();
    }
  },
  newPage: function() {
    var self = this;

    $('button').attr('disabled', true);

    $('.loading__progress').val(0);
    $('.loading').fadeIn('slow', function () {
      self.render();
    });
  },
  insertPhotos: function(photos) {
    var self = this;

    $.get('templates/images.html', function(data) {
      var template = _.template(data);
      if (photos) {
        self.photos.html(template({
          photos: photos.models
        }));

        var dragSourceElement
        $('.draggable')
          .bind('dragstart', function(event) {
            $('.drop-target').css({
              'background-image': 'url("../images/plus.png")'
            });
            window.dragSourceElement = $(this).children();
          })
          .bind('dragend', function() {
            $('.drop-target').css({
              'background-image': 'url("../images/download.png")'
            });
          });

        var images = imagesLoaded(self.photos)
        images.on('done', function() {
          $('.loading').fadeOut();

          if (self.collection.hasNextPage()) {
            $('.next').attr('disabled', false);
          }

          if (self.collection.hasPreviousPage()) {
            $('.prev').attr('disabled', false);
          }
        })

        var count = 0;
        images.on('progress', function(instance, image) {
          $('.loading__progress').val(count++);
        });
      } else {
        self.photos.html(template({
          photos: []
        }));
        $('.loading').fadeOut();
        $('button').attr('disabled', true);
      }
    });
  }
});
