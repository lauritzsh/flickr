var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  thumbnail: function() {
    return 'https://farm' + this.get('farm') +
      '.staticflickr.com/' + this.get('server') +
      '/' + this.get('id') +
      '_' + this.get('secret') +
      '_q.jpg';
  },
  large: function() {
    return 'https://farm' + this.get('farm') +
      '.staticflickr.com/' + this.get('server') +
      '/' + this.get('id') +
      '_' + this.get('secret') +
      '_b.jpg';
  },
  title: function() {
    return this.get('title');
  },
  link: function() {
    return 'https://www.flickr.com/photos/' +
      this.get('owner') +
      '/' + this.get('id');
  }
});
