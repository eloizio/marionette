define(['marionette', 'backbone', 'models/userModel'], function(Marionette, Backbone, UserModel) {
  return Backbone.Collection.extend({
    urlRoot: 'http://localhost:8081/friendships/',
    model: UserModel,

    initialize: function(options) {
      this.fieldToParse = options.fieldToParse;
    },

    parse: function(models) {
      var fieldToParse = this.fieldToParse;

      _.each(models, function(model, index, collection) {
        collection[index] = model[fieldToParse];
      }); 

      return models;
    },

    getFriendships: function() {
      this.fetch({
        url: this.urlRoot + 'me',
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    },

    getFriendshipRequests: function() {
      this.fetch({
        url: this.urlRoot + 'requests',
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    },

    getFriendshipRequested: function() {
      this.fetch({
        url: this.urlRoot + 'requested',
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    },
  });
});