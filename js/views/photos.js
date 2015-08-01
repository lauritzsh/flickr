var StoreManager = require('../store-manager');
var SearchImages = require('../collections/search-images.js');
var _ = require('underscore');
var $ = require('jquery');
// because `imagesloaded` require the wrong package with AMD
var imagesLoaded = require('imports?define=>false!imagesloaded');
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

    $('.loading__progress').css({width: 0});
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

    $('.loading__progress').css({width: 0});
    $('.loading').fadeIn('slow', function () {
      self.render();
    });
  },
  insertPhotos: function(photos) {
    var self = this;

    var imagesTemplate = require('templates/images.html');
    var template = _.template(imagesTemplate);
    if (photos) {
      self.photos.html(template({
        photos: photos.models
      }));

      var dragSourceElement
      $('.draggable')
        .bind('dragstart', function(event) {
          const image = require('images/plus.png');
          $('.drop-target').css({
            'background-image': `url("${image}")`
          });
          window.dragSourceElement = $(this).children();
        })
        .bind('dragend', function() {
          const image = require('images/download.png');
          $('.drop-target').css({
            'background-image': `url("${image}")`
          });
        });

      var images = imagesLoaded(self.photos)
      images.on('done', function() {
        $('.loading').delay(450).fadeOut();

        if (self.collection.hasNextPage()) {
          $('.next').attr('disabled', false);
        }

        if (self.collection.hasPreviousPage()) {
          $('.prev').attr('disabled', false);
        }
      })

      var count = 0;
      images.on('progress', function(instance, image) {
        $('.loading__progress').css({width: `${++count / 12 * 100}%`});
        console.log(count);
      });
    } else {
      self.photos.html(template({
        photos: []
      }));
      $('.loading').delay(450).fadeOut();
      $('button').attr('disabled', true);
    }
  }
});
