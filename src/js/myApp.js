define(['marionette', 'backbone', 'config/socialRouter'], function(Marionette, Backbone, SocialRouter) {
  return Marionette.Application.extend({

    initialize: function() {
      this.router = new SocialRouter();
      
      Backbone.history.start();
    }
  });
});