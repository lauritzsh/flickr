var Images = require('./Images');

module.exports = Images.extend({
  queryParams: {
    method: 'flickr.photos.getRecent'
  }
});
