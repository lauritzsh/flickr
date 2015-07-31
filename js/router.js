var Backbone = require('backbone');
var MainView = require('./views/main.js');
var LocationView = require('./views/location.js');
var SearchView = require('./views/search.js');

var ViewManager = {
  currentView: null,
  showView: function(view) {
    if (this.currentView) {
      this.currentView.undelegateEvents();
    }

    this.currentView = view;
  }
}

module.exports = Backbone.Router.extend({
  routes: {
    '': 'main',
    'location': 'location',
    'search/:query': 'search'
  },
  main: function() {
    var main = new MainView();
    ViewManager.showView(main)
  },
  location: function() {
    var location = new LocationView();
    ViewManager.showView(location)
  },
  search: function(query) {
    var search = new SearchView({query: query});
    ViewManager.showView(search)
  }
});
