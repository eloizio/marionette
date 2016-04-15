define(['marionette', 'backbone', 'layouts/myAppMainLayout', 'layouts/loginLayout', 'layouts/homeLayout', 'layouts/friendsLayout'], 
  function(Marionette, Backbone, MyAppMainLayout, LoginLayout, HomeLayout, FriendsLayout) {
  var SocialController = Marionette.Object.extend({

    initialize: function() {
      this.options.regionManager = new Marionette.RegionManager({
        regions: {
          main: 'body'
        }
      });
    },

    doLogin: function() {
      var layout = new LoginLayout();

      this.listenTo(layout, 'login:success', this.handleLoginSuccess);
      this.getOption('regionManager').get('main').show(layout);
    },

    handleLoginSuccess: function(model, response) {
      this.sessionId = response;
      sessionStorage.sessionId = this.sessionId;
      Backbone.history.navigate('home', {trigger: true});
    },

    doHello: function() {
      this.getOption('regionManager').get('main').show(new MyAppMainLayout());
    },

    doHome: function() {
      this.getOption('regionManager').get('main').show(new HomeLayout());
    },

    showFriends: function() {
      this.getOption('regionManager').get('main').show(new FriendsLayout());
    }

  });

  return Marionette.AppRouter.extend({

    appRoutes: {
      'login': 'doLogin',
      'home': 'doHome',
      'friends': 'showFriends',
      '*path': 'doHello'
    },

    controller: new SocialController(),

    execute: function(callback, args, path) {
      if (path !== 'doLogin' && !sessionStorage.sessionId) {
        Backbone.history.navigate('login', {trigger: true});

        return false;
      }
      else if(path === 'doLogin' && sessionStorage.sessionId) {
        Backbone.history.navigate('', {trigger: true});

        return false;
      }
      else {
        if(callback) {
          callback.apply(this, args);
        }
      }
    }

  });
});