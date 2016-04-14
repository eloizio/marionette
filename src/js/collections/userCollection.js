define(['marionette', 'backbone', 'models/userModel'], function(Marionette, Backbone, UserModel) {
  return Backbone.Collection.extend({
    url: 'http://localhost:8081/users/',
    model: UserModel,

    initialize: function() {
      this.sortKey = 'name';
    },

    comparator: function(a, b) {
      a = a.get(this.sortKey);
      b = b.get(this.sortKey);

      return a > b ? 1 : a < b ? -1 : 0;
    },

    getAllUsers: function() {
      this.fetch({
          headers: {
            'Authorization': 'bearer ' + sessionStorage.sessionId
          }
        }
      );
    }
  });
});