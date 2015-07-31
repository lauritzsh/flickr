var PageableCollection = require('backbone.paginator');
var FlickrImage = require('../models/flickr-image.js');
var config = require('../config.js');

module.exports = PageableCollection.extend({
  model: FlickrImage,
  url: config.apiBase                +
      '?api_key='                    + config.key +
      '&format=json'                 +
      '&nojsoncallback=1',
  parseRecords: function(resp) {
    return resp.photos.photo;
  },
  parseState: function(resp, queryParams, state) {
    state.totalPages = resp.photos.pages;
    state.totalRecords = parseInt(resp.photos.total);

    return state;
  },
  state: {
    pageSize: 12,
    firstPage: 1
  }
});
