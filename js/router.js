var Backbone = require('backbone');

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
    require(['./views/main'], function(MainView) {
      var main = new MainView();
      ViewManager.showView(main);
    });
  },
  location: function() {
    require(['./views/location.js'], function(LocationView) {
      var location = new LocationView();
      ViewManager.showView(location);
    });
  },
  search: function(query) {
    require(['./views/search.js'], function(SearchView) {
      var search = new SearchView({query: query});
      ViewManager.showView(search);
    });
  }
});
